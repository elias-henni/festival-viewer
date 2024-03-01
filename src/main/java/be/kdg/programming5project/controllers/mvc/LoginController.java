package be.kdg.programming5project.controllers.mvc;

import be.kdg.programming5project.controllers.mvc.viewmodels.UserLoginViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
    @GetMapping("/login")
    public ModelAndView logIn(ModelAndView mav) {
        mav.addObject("loginInfo", new UserLoginViewModel());
        mav.setViewName("login");
        return mav;
    }
}
