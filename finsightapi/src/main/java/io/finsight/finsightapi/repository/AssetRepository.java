package io.finsight.finsightapi.repository;

import org.springframework.data.repository.CrudRepository;

import io.finsight.finsightapi.model.Asset;

public interface AssetRepository extends CrudRepository<Asset, String> {
    
}
