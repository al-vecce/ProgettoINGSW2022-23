package it.uni.na.model;

import jakarta.persistence.*;

@Entity
@Table(name = "business")
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Business_SEQ")
    @SequenceGenerator(name = "Business_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "business_name")
    private String business_name;

    @Column(name = "business_phone_number")
    private String business_phone_number;

    @Column(name = "business_address")
    private String business_address;

    @Lob
    @Column(name = "business_logo")
    private Byte[] business_logo;

    @Transient
    private String business_logo_encoded;

    @Column(name = "business_logo_type")
    private String business_logo_type;

    @Column(name = "business_logo_name")
    private String business_logo_name;

    @Lob
    @Column(name = "business_qr")
    private Byte[] business_qr;

    public Byte[] getBusiness_qr() {
        return business_qr;
    }

    public void setBusiness_qr(Byte[] business_qr) {
        this.business_qr = business_qr;
    }

    public String getBusiness_logo_name() {
        return business_logo_name;
    }

    public void setBusiness_logo_name(String business_logo_name) {
        this.business_logo_name = business_logo_name;
    }

    public String getBusiness_logo_type() {
        return business_logo_type;
    }

    public void setBusiness_logo_type(String business_logo_type) {
        this.business_logo_type = business_logo_type;
    }

    public String getBusiness_logo_encoded() {
        return business_logo_encoded;
    }

    public void setBusiness_logo_encoded(String business_logo_encoded) {
        this.business_logo_encoded = business_logo_encoded;
    }

    public Byte[] getBusiness_logo() {
        return business_logo;
    }

    public void setBusiness_logo(Byte[] business_logo) {
        this.business_logo = business_logo;
    }

    public String getBusiness_address() {
        return business_address;
    }

    public void setBusiness_address(String business_address) {
        this.business_address = business_address;
    }

    public String getBusiness_phone_number() {
        return business_phone_number;
    }

    public void setBusiness_phone_number(String business_phone_number) {
        this.business_phone_number = business_phone_number;
    }

    public String getBusiness_name() {
        return business_name;
    }

    public void setBusiness_name(String business_name) {
        this.business_name = business_name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}