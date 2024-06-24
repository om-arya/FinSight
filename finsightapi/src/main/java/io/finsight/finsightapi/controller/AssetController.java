package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.AssetService;
import io.finsight.finsightapi.model.Asset;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class AssetController {

    private AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }
    
    @PostMapping(path = "/assets")
    public Asset createAsset(@RequestBody Asset Asset) {
        return assetService.createAsset(Asset);
    }
    
    @GetMapping(path = "/assets")
    public Asset getAsset(@RequestBody Asset Asset) {
        return assetService.createAsset(Asset);
    }

}