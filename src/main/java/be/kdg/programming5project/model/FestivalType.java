package be.kdg.programming5project.model;

public enum FestivalType {
    RAP("Rap"), EDM("EDM"), ROCK("Rock"), CLASSICAL("Classical"),
    JAZZ("Jazz"), POP("Pop"), FOLK("Folk");

    private String string;

    FestivalType(String string) {
        this.string = string;
    }

    public String getString() {
        return string;
    }
}
