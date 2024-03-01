package be.kdg.programming5project.model;

public enum Countries {
    USA("American"), ENGLAND("British"), NETHERLANDS("Dutch")
    , CANADA("Canadian"),BELGIUM("Belgian"), GERMANY("German"), SPAIN("Spanish"),
    ITALY("Italian"),  FRANCE("French"), PORTUGAL("Portuguese");

    private String nationality;

    Countries(String nationality) {
        this.nationality = nationality;
    }

    public String getNationality() {
        return nationality;
    }
}
