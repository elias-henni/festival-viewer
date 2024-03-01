package be.kdg.programming5project.controllers.mvc.viewmodels;

public class UserLoginViewModel {
    private String username;
    private String password;

    public UserLoginViewModel() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
