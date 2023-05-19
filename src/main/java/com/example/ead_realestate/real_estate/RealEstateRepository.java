package com.example.ead_realestate.real_estate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RealEstateRepository extends JpaRepository<RealEstate, Integer> {

    @Query("SELECT r FROM RealEstate r WHERE r.address = ?1")
    Optional<RealEstate> findRealEstateByAddress(String address);

    @Query("SELECT r FROM RealEstate r WHERE r.title = ?1")
    Optional<RealEstate> findRealEstateByTitle(String title);
}
