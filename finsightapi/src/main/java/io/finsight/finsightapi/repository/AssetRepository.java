package io.finsight.finsightapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.finsight.finsightapi.model.entity.AssetEntity;

@Repository
public interface AssetRepository extends CrudRepository<AssetEntity, String> {
}
