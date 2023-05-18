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

    @GetMapping(path = "{realEstateId}")
    public RealEstate getARealEstate(@PathVariable String realEstateId) {
        return realEstateService.getARealEstate(Integer.parseInt(realEstateId));
    }

    @PostMapping
    public void registerNewRealEstate(@RequestBody RealEstate realEstate) {
        realEstateService.addNewRealEstate(realEstate);
    }

    @PutMapping(path = "{realEstateId}")
    public void updateRealEstate(@PathVariable("realEstateId") Integer realEstateId,
                                 @RequestParam(required = false) String title,
                                 @RequestParam(required = false) String address,
                                 @RequestParam(required = false) Integer district,
                                 @RequestParam(required = false) Integer area,
                                 @RequestParam(required = false) Integer price,
                                 @RequestParam(required = false) Integer floors,
                                 @RequestParam(required = false) String features,
                                 @RequestParam(required = false) Integer contact_number,
                                 @RequestParam(required = false) String contact_name,
                                 @RequestParam(required = false) String house_type){
        realEstateService.updateRealEstate(realEstateId, title, address, district, area, price, floors, features, contact_number, contact_name, house_type);
    }

    @DeleteMapping(path = "/{realEstateId}")
    public void deleteRealEstate(@PathVariable("realEstateId") Integer realEstateId) {
        realEstateService.deleteRealEstate(realEstateId);
    }
}
