package com.example.ead_realestate.real_estate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RealEstateService {
    private final RealEstateRepository realEstateRepository;

    @Autowired
    public RealEstateService(RealEstateRepository realEstateRepository) {
        this.realEstateRepository = realEstateRepository;
    }

    public List<RealEstate> getRealEstate() {
        return realEstateRepository.findAll();
    }


    public void addNewRealEstate(RealEstate realEstate) {
        Optional<RealEstate> realEstateOptional = realEstateRepository.findRealEstateByAddress(realEstate.getAddress());
        Optional<RealEstate> realEstateOptional1 = realEstateRepository.findRealEstateByTitle(realEstate.getTitle());
        if (realEstateOptional.isPresent()) {
            throw new IllegalStateException("address taken");
        }
        else if(realEstateOptional1.isPresent()){
            throw new IllegalStateException("title taken");
        }
        realEstateRepository.save(realEstate);
    }

    public void deleteRealEstate(Integer realEstateId) {
        boolean exists = realEstateRepository.existsById(realEstateId);
        if (!exists) {
            throw new IllegalStateException("real estate with id " + realEstateId + " does not exists");
        }
        realEstateRepository.deleteById(realEstateId);
    }

    @Transactional
    public void updateRealEstate(Integer realEstateId, String title, String address, Integer district, Integer area, Integer price, Integer floors, String features, Integer contact_number, String contact_name, String house_type){
        RealEstate realEstate = realEstateRepository.findById(realEstateId)
                .orElseThrow(() -> new IllegalStateException("real estate with id " + realEstateId + " does not exists"));

        if(title != null && title.length() > 0 && !Objects.equals(realEstate.getTitle(), title)){
            Optional<RealEstate> realEstateOptional = realEstateRepository.findRealEstateByTitle(title);
            if (realEstateOptional.isPresent()) {
                throw new IllegalStateException("title taken");
            }
            realEstate.setTitle(title);
        }

        if(address != null && address.length() > 0 && !Objects.equals(realEstate.getAddress(), address)){
            Optional<RealEstate> realEstateOptional = realEstateRepository.findRealEstateByAddress(address);
            if (realEstateOptional.isPresent()) {
                throw new IllegalStateException("address taken");
            }
            realEstate.setAddress(address);
        }

        if(district != null && !Objects.equals(realEstate.getDistrict(), district)){
            realEstate.setDistrict(district);
        }

        if(area != null && !Objects.equals(realEstate.getArea(), area)){
            realEstate.setArea(area);
        }

        if(price != null && !Objects.equals(realEstate.getPrice(), price)){
            realEstate.setPrice(price);
        }

        if(floors != null && !Objects.equals(realEstate.getFloors(), floors)){
            realEstate.setFloors(floors);
        }

        if(features != null && features.length() > 0 && !Objects.equals(realEstate.getFeatures(), features)){
            realEstate.setFeatures(features);
        }

        if(contact_number != null && !Objects.equals(realEstate.getContact_number(), contact_number)){
            realEstate.setContact_number(contact_number);
        }

        if(contact_name != null && contact_name.length() > 0 && !Objects.equals(realEstate.getContact_name(), contact_name)){
            realEstate.setContact_name(contact_name);
        }

        if(house_type != null && house_type.length() > 0 && !Objects.equals(realEstate.getHouse_type(), house_type)){
            realEstate.setHouse_type(house_type);
        }
    }

    public RealEstate getARealEstate(Integer realEstateId) {
        Optional<RealEstate> realEstateOptional = realEstateRepository.findById(realEstateId);
        if (realEstateOptional.isEmpty()) {
            throw new IllegalStateException("real estate with id " + realEstateId + " does not exists");
        }
        return realEstateOptional.get();
    }
}
