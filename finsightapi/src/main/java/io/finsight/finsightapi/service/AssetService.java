package io.finsight.finsightapi.service;

import org.springframework.stereotype.Service;

import io.finsight.finsightapi.model.entity.AssetEntity;

@Service
public class AssetService {
    public AssetEntity createAsset(AssetEntity asset) {
        return new AssetEntity();
    }

    public AssetEntity getAsset(String name) {
        return null;
    }
}