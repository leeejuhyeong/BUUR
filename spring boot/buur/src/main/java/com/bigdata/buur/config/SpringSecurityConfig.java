package com.bigdata.buur.config;

import com.bigdata.buur.util.JwtAuthenticationFilter;
import com.bigdata.buur.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    // 모두가 접근할 수 있는 URL 입력
    private final String[] NO_ROLE_URLS = {"/user/signup", "/user/id-check/", "/user/name-check/", "/user/login", "user/findpassword"};

    // 암호화에 필요한 PasswordEncoder 를 Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // authenticationManager(인증 메소드를 제공하는 인터페이스)를 Bean 등록
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .httpBasic().disable() // rest api 만을 고려하여 기본 설정은 해제
//                .csrf().disable() // csrf 보안 토큰 disable처리
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 역시 사용하지 않음
//                .and()
//                    .authorizeRequests() // 요청에 대한 사용권한 체크
//                    .antMatchers("/user/**").hasRole("USER")
//                    .anyRequest().permitAll() // 그외 나머지 요청은 누구나 접근 가능
//                .and()
//                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
//                        UsernamePasswordAuthenticationFilter.class);

        /* Spring Security 설정 */
        http
                .httpBasic()
                .and()// rest api 만을 고려하여 기본 설정은 해제
                .csrf().disable() // csrf 보안 토큰 disable처리
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 역시 사용하지 않음
                .and()
                .authorizeRequests()
//                .antMatchers("/user/signup", "/user/id-check/", "/user/name-check/", "/user/login", "user/findpassword")
                .antMatchers(NO_ROLE_URLS)
                .permitAll()
                .anyRequest().hasRole("USER")
                .and()
//                .formLogin()
                // 커스텀 페이지
//                  .loginPage("/view/login")
//                  .loginProcessingUrl("/loginProc")
//                  .usernameParameter("id")
//                  .passwordParameter("pw")
//                  .defaultSuccessUrl("/view/dashboard", true)
//                    .permitAll()
//                .defaultSuccessUrl("/login") //정상일떄
//                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);

        /* 로그아웃 처리 */
//        http
//                .logout()
//                .logoutUrl("/user/logout")
//                .permitAll();

    }

}
