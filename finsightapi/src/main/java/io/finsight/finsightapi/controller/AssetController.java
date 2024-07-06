package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.AssetService;
import io.finsight.finsightapi.model.dto.AssetDto;
import io.finsight.finsightapi.model.entity.AssetEntity;
import io.finsight.finsightapi.model.mapper.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AssetController {
    private AssetService assetService;
    private Mapper<AssetEntity, AssetDto> assetMapper;

    public AssetController(AssetService assetService, Mapper<AssetEntity, AssetDto> assetMapper) {
        this.assetService = assetService;
        this.assetMapper = assetMapper;
    }

    /* CREATE ENDPOINTS */

    /**
     * Create a new asset to save into the database. If an asset with this
     * ticker already exists, it is silently ignored.
     * 
     * @param asset to save into the database.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PostMapping(path = "/assets")
    ResponseEntity<Void> createAsset(@RequestBody AssetDto assetDto) {
        AssetEntity assetEntity = assetMapper.mapFrom(assetDto);
        return assetService.createAsset(assetEntity);
    }

    /* READ ENDPOINTS */

    /**
     * Get the asset from the database with the specified ticker. If the
     * asset does not exist, the service returns an empty body.
     * 
     * @param ticker of the asset to get from the database.
     * @return a ResponseEntity consisting of an asset DTO, which is
     *         empty if not found, along with an HTTP status.
     */
    @GetMapping(path = "/assets/{ticker}")
    public ResponseEntity<AssetDto> getAssetByTicker(@PathVariable String ticker) {
        ResponseEntity<Optional<AssetEntity>> responseEntity = assetService.getAssetByTicker(ticker);

        Optional<AssetEntity> optionalAssetEntity = responseEntity.getBody();
        AssetEntity assetEntity = optionalAssetEntity != null ? optionalAssetEntity.get() : null;
        HttpStatusCode status = responseEntity.getStatusCode();

        AssetDto assetDto = assetMapper.mapTo(assetEntity);
        return new ResponseEntity<>(assetDto, status);
    }

    /**
     * Get all assets from the database.
     * 
     * @return a list of all assets from the database.
     */
    @GetMapping(path = "/assets/all")
    public ResponseEntity<List<AssetDto>> getAllAssets() {
        ResponseEntity<List<AssetEntity>> responseEntity = assetService.getAllAssets();
        HttpStatusCode status = responseEntity.getStatusCode();

        return new ResponseEntity<>(getAssetDtoListFromResponseEntity(responseEntity), status);
    }

    /**
     * Get the top 8 assets by the highest % change between their last
     * 2 prices.
     * 
     * @return a list of the top 8 assets by price change.
     */
    @GetMapping(path = "/assets/toppricechange")
    public ResponseEntity<List<AssetDto>> getTopAssetsByPriceChange() {
        ResponseEntity<List<AssetEntity>> responseEntity = assetService.getTopAssetsByPriceChange();
        HttpStatusCode status = responseEntity.getStatusCode();

        return new ResponseEntity<>(getAssetDtoListFromResponseEntity(responseEntity), status);
    }

    /**
     * Get the top 8 assets by the most positive % change between their
     * last 2 prices.
     * 
     * @return a list of the top 8 assets by price gain.
     */
    @GetMapping(path = "/assets/toppricegain")
    public ResponseEntity<List<AssetDto>> getTopAssetsByPriceGain() {
        ResponseEntity<List<AssetEntity>> responseEntity = assetService.getTopAssetsByPriceGain();
        HttpStatusCode status = responseEntity.getStatusCode();

        return new ResponseEntity<>(getAssetDtoListFromResponseEntity(responseEntity), status);
    }

    /**
     * Get the top 8 assets by the most negative % change between their
     * last 2 prices.
     * 
     * @return a list of the top 8 assets by price loss.
     */
    @GetMapping(path = "/assets/toppriceloss")
    public ResponseEntity<List<AssetDto>> getTopAssetsByPriceLoss() {
        ResponseEntity<List<AssetEntity>> responseEntity = assetService.getTopAssetsByPriceLoss();
        HttpStatusCode status = responseEntity.getStatusCode();

        return new ResponseEntity<>(getAssetDtoListFromResponseEntity(responseEntity), status);
    }

    /**
     * Helper method for getting an asset DTO list from a response entity
     * of an asset entity list.
     * 
     * @param responseEntity to convert to an asset DTO list.
     * @return an asset DTO list.
     */
    private List<AssetDto> getAssetDtoListFromResponseEntity(ResponseEntity<List<AssetEntity>> responseEntity) {
        List<AssetEntity> assetEntityList = responseEntity.getBody();
        if (assetEntityList == null) {
            return new ArrayList<AssetDto>();
        }

        List<AssetDto> assetDtoList = assetEntityList.stream()
            .map(assetEntity -> assetMapper.mapTo(assetEntity))
            .collect(Collectors.toList());
        return assetDtoList;
    }

    /* UPDATE ENDPOINTS */

    /**
     * Add the new price to the prices of the asset with the specified
     * ticker. If the asset does not exist, it is silently ignored.
     * 
     * @param ticker of the asset to update the prices of.
     * @param newPrice to add to the prices.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PatchMapping(path = "/assets/{ticker}")
    public ResponseEntity<Void> addAssetPrice(@PathVariable String ticker, @RequestParam Double newPrice) {
        return assetService.addAssetPrice(ticker, newPrice);
    }

    /* DELETE ENDPOINTS */

    /**
     * Delete the asset with the specified ticker from the database. If
     * the asset does not exist, it is silently ignored.
     * 
     * @param ticker of the asset to delete from the database.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @DeleteMapping(path = "/assets/{ticker}")
    public ResponseEntity<Void> deleteAsset(@PathVariable String ticker) {
        return assetService.deleteAsset(ticker);
    }
}