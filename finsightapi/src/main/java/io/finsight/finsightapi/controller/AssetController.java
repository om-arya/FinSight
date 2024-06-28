package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.AssetService;
import io.finsight.finsightapi.model.dto.AssetDto;
import io.finsight.finsightapi.model.entity.AssetEntity;
import io.finsight.finsightapi.model.mapper.Mapper;

import java.util.Optional;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    /* READ METHODS */

    /**
     * Get the asset from the database with the specified name. If the
     * asset does not exist, the service returns a NOT_FOUND status.
     * 
     * @param name of the asset to get from the database.
     * @return a ResponseEntity consisting of an asset DTO, which is
     *         empty if not found, along with an HTTP status.
     */
    @GetMapping(path = "/assets/{name}")
    public ResponseEntity<AssetDto> getAssetByName(@PathVariable String name) {
        ResponseEntity<Optional<AssetEntity>> responseEntity = assetService.getAssetByName(name);

        Optional<AssetEntity> optionalAssetEntity = responseEntity.getBody();
        AssetEntity assetEntity = optionalAssetEntity != null ? optionalAssetEntity.get() : null;
        HttpStatusCode status = responseEntity.getStatusCode();

        AssetDto assetDto = assetMapper.mapTo(assetEntity);
        return new ResponseEntity<>(assetDto, status);
    }

    /* UPDATE METHODS */

    /**
     * Update the prices of the asset with the specified name. If the
     * asset does not exist, the service returns a NOT_FOUND status.
     * 
     * @param name of the asset to update the prices of.
     * @param newPrices to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PatchMapping(path = "/assets/{name}")
    public ResponseEntity<Void> setAssetPrices(@PathVariable String name, @RequestBody Double[] newPrices) {
        return assetService.setAssetPrices(name, newPrices);
    }
}