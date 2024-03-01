package be.kdg.programming5project.model;

import javax.persistence.*;

@Entity
@Table(name = "image")
public class Image extends ProjectEntity {
    @Lob
    private byte[] data;

    private String fileName;
    private String fileType;

    public Image(String fileName, String fileType, byte[] data) {
        this.data = data;
        this.fileName = fileName;
        this.fileType = fileType;
    }

    protected Image() {

    }

    public byte[] getData() {
        return data;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
}
