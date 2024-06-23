package main.java.io.finsight.finsightapi.config;

import java.beans.BeanProperty;
import java.util.List;

import org.springframework.annotation.Bean;
import org.springframework.annotation.Configuration;

@Configuration
public class CorsConfig {

    @BeanProperty
    public CorsFilter corsFilter() {
        var urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        var corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedCredentials(true);
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173/"));

        corsConfiguration.setAllowedHeaders(List.of(ORIGIN, ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_TYPE, ACCEPT, AUTHORIZATION, X_REQUESTED_WITH, ACCESS_CONTROL_REQUEST_METHOD, ACCESS_CONTROL_REQUEST_HEADERS, ACCESS_CONTROL_ALLOW_CREDENTIALS));
        corsConfiguration.setExposedHeaders(List.of(ORIGIN, ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_TYPE, ACCEPT, AUTHORIZATION, X_REQUESTED_WITH, ACCESS_CONTROL_REQUEST_METHOD, ACCESS_CONTROL_REQUEST_HEADERS, ACCESS_CONTROL_ALLOW_CREDENTIALS));
        corsConfiguration.setAllowedMethods(List.of(GET.name(), POST.name(), PUT.name(), PATCH.name(), DELETE.name(), OPTIONS.name()));
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

}
