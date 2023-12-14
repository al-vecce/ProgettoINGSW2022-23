package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;


@Entity
public class Business extends PanacheEntityBase {

    public static final int PAGES = 10;

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
    private byte[] business_logo;

    @Transient
    private String business_logo_encoded;

    @Column(name = "business_logo_type")
    private String business_logo_type;

    @Column(name = "business_logo_name")
    private String business_logo_name;

    @Lob
    @Column(name = "business_qr")
    private byte[] business_qr;

    @Column(name = "business_qr_type")
    private String business_qr_type;

    @Transient
    private String business_qr_encoded;

    @OneToMany(mappedBy = "business", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Employee> employees = new ArrayList<>();

    public String getBusiness_qr_encoded() {
        return business_qr_encoded;
    }

    public void setBusiness_qr_encoded(String business_qr_encoded) {
        this.business_qr_encoded = business_qr_encoded;
    }

    public String getBusiness_qr_type() {
        return business_qr_type;
    }

    public void setBusiness_qr_type(String business_qr_type) {
        this.business_qr_type = business_qr_type;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public byte[] getBusiness_qr() {
        return business_qr;
    }

    public void setBusiness_qr(byte[] business_qr) {
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

    public byte[] getBusiness_logo() {
        return business_logo;
    }

    public void setBusiness_logo(byte[] business_logo) {
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

    @Override
    public String toString() {
        return "{\n" +
                "\t\"business_name\": \"" + business_name + "\",\n" +
                "\t\"business_phone_number\": \"" + business_phone_number + "\",\n" +
                "\t\"business_address\": \"" + business_address + "\",\n" +
                "\t\"business_logo_encoded\": \"" + business_logo_encoded + "\",\n" +
                "\t\"business_logo_type\": \"" + business_logo_type + "\",\n" +
                "\t\"business_logo_name\": \"" + business_logo_name + "\"\n" +
                "}";
    }
    public String toStringQR() {
        String str = "{\n" +
                "\t\"business_name\": \"" + business_name + "\",\n" +
                "\t\"business_phone_number\": \"" + business_phone_number + "\",\n" +
                "\t\"business_address\": \"" + business_address + "\",\n";
                if(business_logo_type != null) {
                    if(business_logo_type.contains("svg")){
                        str = str +
                                "\t\"business_logo_encoded\": \"" + "data:image/" + business_logo_type.substring(1) + "+xml;base64," + business_logo_encoded + "\",\n" +
                                "\t\"business_logo_type\": \"" + business_logo_type + "\",\n" +
                                "\t\"business_logo_name\": \"" + business_logo_name + "\",\n";
                    }
                    else {
                        str = str +
                                "\t\"business_logo_encoded\": \"" + "data:image/" + business_logo_type.substring(1) + ";base64," + business_logo_encoded + "\",\n" +
                                "\t\"business_logo_type\": \"" + business_logo_type + "\",\n" +
                                "\t\"business_logo_name\": \"" + business_logo_name + "\",\n";
                    }
                }
                else {
                    str = str +
                    "\t\"business_logo_encoded\": \"" + business_logo_encoded + "\",\n" +
                            "\t\"business_logo_type\": \"" + business_logo_type + "\",\n" +
                            "\t\"business_logo_name\": \"" + business_logo_name + "\",\n";
                }
        str = str +
                "\t\"business_qr_encoded\": \"" + business_qr_encoded + "\",\n" +
                "\t\"business_qr_type\": \"" + business_qr_type + "\"\n" +
                "}";
        return str;
    }

    @Transactional
    public static Business findPrimaryBusiness() {
        return Business.find("id", 1).firstResult();
    }
}