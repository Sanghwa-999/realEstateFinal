package com.example.ead_realestate.real_estate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class RealEstateConfig {

    @Bean
    CommandLineRunner commandLineRunner(RealEstateRepository repository){
        return args -> {
//            RealEstate hanoi = new RealEstate(
//                    "Villa",
//                    100000000,
//                    "Hanoi",
//                    100,
//                    "Villa in Hanoi",
//                    "https://www.upsieutoc.com/images/2020/07/07/img1.jpg"
//            );
//
//            RealEstate hcmc = new RealEstate(
//                    "Apartment",
//                    200000000,
//                    "HCMC",
//                    200,
//                    "Apartment in HCMC",
//                    "https://www.upsieutoc.com/images/2020/07/07/img2.jpg"
//            );
//
//            RealEstate danang = new RealEstate(
//                    "House",
//                    300000000,
//                    "Danang",
//                    300,
//                    "House in Danang",
//                    "https://www.upsieutoc.com/images/2020/07/07/img3.jpg"
//            );
//
//            repository.saveAll(
//                    List.of(hanoi, hcmc, danang)
//            );

        };
    }
}
