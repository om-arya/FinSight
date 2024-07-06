package io.finsight.finsightapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.finsight.finsightapi.model.entity.AssetEntity;
import io.finsight.finsightapi.repository.AssetRepository;

@Service
public class AssetService {
    private AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    /* CREATE OPERATIONS */

    /**
     * Create a new asset to save into the database. If an asset with this
     * ticker already exists, it is silently ignored.
     * 
     * @param asset to save into the database.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    public ResponseEntity<Void> createAsset(AssetEntity asset) {
        ResponseEntity<Optional<AssetEntity>> assetResponseEntity = getAssetByTicker(asset.getTicker());

        if (assetResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Optional<AssetEntity> assetOptional = assetResponseEntity.getBody();
        if (assetOptional != null && assetOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        try {
            assetRepository.save(asset);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* READ OPERATIONS */

    /**
     * Get the asset from the database with the specified ticker. If the
     * asset does not exist, return an empty body.
     * 
     * @param ticker of the asset to get from the database.
     * @return a ResponseEntity consisting of an asset entity optional,
     *         which is empty if not found, along with an HTTP status.
     */
    public ResponseEntity<Optional<AssetEntity>> getAssetByTicker(String ticker) {
        try {
            Optional<AssetEntity> asset = assetRepository.findById(ticker);
            return new ResponseEntity<>(asset, HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(Optional.empty(), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(Optional.empty(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all assets from the database.
     * 
     * @return a list of all assets from the database.
     */
    public ResponseEntity<List<AssetEntity>> getAllAssets() {
        try {
            List<AssetEntity> assetList = StreamSupport
                .stream(assetRepository.findAll().spliterator(), false)
                .collect(Collectors.toList()); 
            return new ResponseEntity<>(assetList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(new ArrayList<AssetEntity>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get the top 8 assets by the highest % change between their last
     * 2 prices.
     * 
     * @return a list of the top 8 assets by price change.
     */
    public ResponseEntity<List<AssetEntity>> getTopAssetsByPriceChange() {
        try {
            List<AssetEntity> assetList = StreamSupport.stream(assetRepository.findAll().spliterator(), false)
                .sorted((a1, a2) -> Double.compare(
                    Math.abs(calculatePriceChange(a2)), Math.abs(calculatePriceChange(a1))
                ))
                .limit(8)
                .collect(Collectors.toList());
            return new ResponseEntity<>(assetList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(new ArrayList<AssetEntity>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get the top 8 assets by the most positive % change between their
     * last 2 prices.
     * 
     * @return a list of the top 8 assets by price gain.
     */
    public ResponseEntity<List<AssetEntity>> getTopAssetsByPriceGain() {
        try {
            List<AssetEntity> assetList = StreamSupport.stream(assetRepository.findAll().spliterator(), false)
                .sorted((a1, a2) -> Double.compare(
                    calculatePriceChange(a2), calculatePriceChange(a1)
                ))
                .limit(8)
                .collect(Collectors.toList());
            return new ResponseEntity<>(assetList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(new ArrayList<AssetEntity>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get the top 8 assets by the most negative % change between their
     * last 2 prices.
     * 
     * @return a list of the top 8 assets by price loss.
     */
    public ResponseEntity<List<AssetEntity>> getTopAssetsByPriceLoss() {
        try {
            List<AssetEntity> assetList = StreamSupport.stream(assetRepository.findAll().spliterator(), false)
                .sorted((a1, a2) -> Double.compare(
                    calculatePriceChange(a1), calculatePriceChange(a2)
                ))
                .limit(8)
                .collect(Collectors.toList());
            return new ResponseEntity<>(assetList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(new ArrayList<AssetEntity>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Helper method for computing the % change between the last 2 prices
     * of the given asset. Can be positive or negative.
     * 
     * @param asset to compute the price change of.
     * @return the % change between the last 2 prices.
     */
    private double calculatePriceChange(AssetEntity asset) {
        List<Double> prices = asset.getPrices();
        Double lastPrice = prices.get(prices.size() - 1);
        Double secondLastPrice = prices.get(prices.size() - 2);
        return (lastPrice / secondLastPrice * 100 - 100);
    }

    /* UPDATE OPERATIONS */

    /**
     * Add the new price to the prices of the asset with the specified
     * ticker. If the asset does not exist, it is silently ignored.
     * 
     * @param ticker of the asset to update the prices of.
     * @param newPrice to add to the prices.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    public ResponseEntity<Void> addAssetPrice(String ticker, Double newPrice) {
        ResponseEntity<Optional<AssetEntity>> assetResponseEntity = getAssetByTicker(ticker);
        if (assetResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Optional<AssetEntity> optionalAsset = assetResponseEntity.getBody();
        if (optionalAsset == null || optionalAsset.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.OK); 
        }

        AssetEntity asset = optionalAsset.get();
        List<Double> prices = asset.getPrices();
        
        prices.remove(0);
        prices.add(newPrice);

        try {
            asset.setPrices(prices);
            assetRepository.save(asset);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* DELETE OPERATIONS */

    /**
     * Delete the asset with the specified ticker from the database. If
     * the asset does not exist, it is silently ignored.
     * 
     * @param ticker of the asset to delete from the database.
     * @return a ResponseEntity consisting of an HTTP status.
     */
     public ResponseEntity<Void> deleteAsset(String ticker) {
        try {
            assetRepository.deleteById(ticker);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
}