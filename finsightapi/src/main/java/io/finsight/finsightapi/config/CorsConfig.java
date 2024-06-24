package io.finsight.finsightapi.config;

import java.util.List;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        var urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        var corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedHeaders(List.of("http://localhost:5173/", "http://localhost:8080/"));

        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        // return new CorsFilter(urlBasedCorsConfigurationSource);
        return new CorsFilter();
    }

}
