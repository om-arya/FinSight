package io.finsight.finsightapi.service;

import java.util.Optional;

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
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* READ OPERATIONS */

    /**
     * Get the asset from the database with the specified ticker. If the
     * asset does not exist, return a NOT_FOUND status.
     * 
     * @param ticker of the asset to get from the database.
     * @return a ResponseEntity consisting of an asset entity optional,
     *         which is empty if not found, along with an HTTP status.
     */
    public ResponseEntity<Optional<AssetEntity>> getAssetByTicker(String ticker) {
        try {
            Optional<AssetEntity> asset = assetRepository.findById(ticker);
            if (asset.isEmpty()) {
                return new ResponseEntity<>(asset, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(asset, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(Optional.empty(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* UPDATE OPERATIONS */

    /**
     * Add the new price to the prices of the asset with the specified
     * ticker. If the asset does not exist, return a NOT_FOUND status.
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
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }

        AssetEntity asset = optionalAsset.get();
        Double[] currentPrices = asset.getPrices();
        
        Double[] newPrices = new Double[currentPrices.length + 1];
        System.arraycopy(currentPrices, 0, newPrices, 0, currentPrices.length);
        newPrices[currentPrices.length] = newPrice;

        try {
            asset.setPrices(newPrices);
            assetRepository.save(asset);
            return new ResponseEntity<>(HttpStatus.OK);
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