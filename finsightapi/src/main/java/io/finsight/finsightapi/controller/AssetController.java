package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.AssetService;
import io.finsight.finsightapi.model.dto.AssetDto;
import io.finsight.finsightapi.model.entity.AssetEntity;
import io.finsight.finsightapi.model.mapper.Mapper;

import java.util.Optional;

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

    /* UPDATE ENDPOINTS */

    /**
     * Add the new price to the prices of the asset with the specified
     * ticker. If the asset does not exist, the service returns a
     * NOT_FOUND status.
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