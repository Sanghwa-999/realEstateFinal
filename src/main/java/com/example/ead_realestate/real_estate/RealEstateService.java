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
        if (realEstateOptional.isPresent()) {
            throw new IllegalStateException("address taken");
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
    public void updateStudent(RealEstate realEstate){
        Optional<RealEstate> realEstateCheck = realEstateRepository.findById(realEstate.getId());

        if(realEstateCheck.isEmpty()) {
            throw new IllegalStateException("real estate with id " + realEstate.getId() + " does not exists");
        }

        if(realEstateCheck.get().getTitle() != null && realEstateCheck.get().getTitle().length() > 0 && !Objects.equals(realEstate.getTitle(), realEstateCheck.get().getTitle())){
            realEstateCheck.get().setTitle(realEstate.getTitle());
        }

        if(realEstateCheck.get().getAddress() != null && realEstateCheck.get().getAddress().length() > 0 && !Objects.equals(realEstate.getAddress(), realEstateCheck.get().getAddress())){
            realEstateCheck.get().setAddress(realEstate.getAddress());
        }

        if(realEstateCheck.get().getArea() != null && !Objects.equals(realEstate.getArea(), realEstateCheck.get().getArea())){
            realEstateCheck.get().setArea(realEstate.getArea());
        }

        if(realEstateCheck.get().getPrice() != null && !Objects.equals(realEstate.getPrice(), realEstateCheck.get().getPrice())){
            realEstateCheck.get().setPrice(realEstate.getPrice());
        }

        if(realEstateCheck.get().getDistrict() != null && !Objects.equals(realEstate.getDistrict(), realEstateCheck.get().getDistrict())){
            realEstateCheck.get().setDistrict(realEstate.getDistrict());
        }

        if(realEstateCheck.get().getFloors() != null && !Objects.equals(realEstate.getFloors(), realEstateCheck.get().getFloors())){
            realEstateCheck.get().setFloors(realEstate.getFloors());
        }

        if(realEstateCheck.get().getFeatures() != null && realEstateCheck.get().getFeatures().length() > 0 && !Objects.equals(realEstate.getFeatures(), realEstateCheck.get().getFeatures())){
            realEstateCheck.get().setFeatures(realEstate.getFeatures());
        }

        if(realEstateCheck.get().getContact_number() != null && !Objects.equals(realEstate.getContact_number(), realEstateCheck.get().getContact_number())){
            realEstateCheck.get().setContact_number(realEstate.getContact_number());
        }

        if(realEstateCheck.get().getContact_name() != null && realEstateCheck.get().getContact_name().length() > 0 && !Objects.equals(realEstate.getContact_name(), realEstateCheck.get().getContact_name())){
            realEstateCheck.get().setContact_name(realEstate.getContact_name());
        }

        if(realEstateCheck.get().getImage() != null && realEstateCheck.get().getImage().length() > 0 && !Objects.equals(realEstate.getImage(), realEstateCheck.get().getImage())){
            realEstateCheck.get().setImage(realEstate.getImage());
        }
    }
}
