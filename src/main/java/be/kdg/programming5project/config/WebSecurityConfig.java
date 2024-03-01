package be.kdg.programming5project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // @formatter:off
        http
                .httpBasic()
                    .and()
                .csrf()
                    .ignoringAntMatchers("/api/artists/search") // Ignoring this for the separate client (npm/webpack)
                    .ignoringAntMatchers("/api/artists/client") // Ignoring this for the separate client (npm/webpack)
                    .ignoringAntMatchers("/api/image/upload/*/*/*")
                    .and()
                .cors()
                    .and()
                .authorizeHttpRequests(
                        auths ->
                                auths
                                        .antMatchers("/", "/artists/**", "/festivals/**", "/locations/**", "/artists", "/festivals", "/locations", "/api/image/download/*/*", "/api/image/upload/*/*/*", "/api/festivals/*/artists")
                                            .permitAll()
                                        .regexMatchers(HttpMethod.GET, ".+\\.(css|js|map|woff2?|jpg)(\\?.*)?")
                                            .permitAll()
                                        .antMatchers( "/static/favicon.ico")
                                            .permitAll()
                                        .antMatchers(HttpMethod.PUT, "/api/festivals/**", "/api/artists/**")
                                            .hasRole("ADMIN")
                                        .antMatchers(HttpMethod.DELETE, "/api/festivals/**")
                                            .hasAnyRole("ADMIN", "FESTIVAL_MANAGER")
                                        .antMatchers(HttpMethod.POST, "/api/festivals/**")
                                            .hasAnyRole("ADMIN", "FESTIVAL_MANAGER")
                                        .antMatchers(HttpMethod.DELETE, "/api/artists/**")
                                            .hasAnyRole("ADMIN", "ARTIST_MANAGER")
                                        .antMatchers(HttpMethod.POST, "/api/artists/**")
//                                            .hasAnyRole("ADMIN", "ARTIST_MANAGER")
                                            .permitAll()
                                        .antMatchers(HttpMethod.POST, "/api/artists/client") // This is used to test client
                                            .permitAll() // This is used to test client
                                        .antMatchers("/api/artists/search").permitAll()

                                        .anyRequest()
                                        .authenticated())
                .headers().frameOptions().disable()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();
        // @formatter:on
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**").allowedOrigins("http://localhost:9000");
            }
        };
    }
}
