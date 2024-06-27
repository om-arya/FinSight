package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.AssetService;
import io.finsight.finsightapi.model.dto.AssetDto;
import io.finsight.finsightapi.model.entity.AssetEntity;
import io.finsight.finsightapi.model.mapper.Mapper;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class AssetController {
    private AssetService assetService;
    private Mapper<AssetEntity, AssetDto> assetMapper;

    public AssetController(AssetService assetService, Mapper<AssetEntity, AssetDto> assetMapper) {
        this.assetService = assetService;
        this.assetMapper = assetMapper;
    }
    
    @PostMapping(path = "/assets")
    public AssetEntity createAsset(@RequestBody AssetEntity Asset) {
        return assetService.createAsset(Asset);
    }
    
    @GetMapping(path = "/assets")
    public AssetEntity getAsset(@RequestBody AssetEntity Asset) {
        return assetService.createAsset(Asset);
    }
}