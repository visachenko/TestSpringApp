package ru.tdpyramid.testspringapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/workers").setViewName("workers");
        registry.addViewController("/animals").setViewName("animals");
        registry.addViewController("/").setViewName("workers");
    }

}
