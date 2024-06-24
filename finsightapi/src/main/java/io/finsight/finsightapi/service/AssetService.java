package io.finsight.finsightapi.service;

import org.springframework.stereotype.Service;

import io.finsight.finsightapi.model.Asset;

@Service
public class AssetService {
    public Asset createAsset(Asset asset) {
        return new Asset();
    }

    public Asset getAsset(String name) {
        return null;
    }
}