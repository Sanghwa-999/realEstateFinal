package com.example.ead_realestate.real_estate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/real_estate")
public class RealEstateController {
    private final RealEstateService realEstateService;

    @Autowired
    public RealEstateController(RealEstateService realEstateService) {
        this.realEstateService = realEstateService;
    }

    @GetMapping
    public List<RealEstate> getRealEstate() {
        return realEstateService.getRealEstate();
    }

    @PostMapping
    public void registerNewRealEstate(@RequestBody RealEstate realEstate) {
        realEstateService.addNewRealEstate(realEstate);
    }

    @DeleteMapping(path = "/{realEstateId}")
    public void deleteRealEstate(@PathVariable("realEstateId") Integer realEstateId) {
        realEstateService.deleteRealEstate(realEstateId);
    }
}
