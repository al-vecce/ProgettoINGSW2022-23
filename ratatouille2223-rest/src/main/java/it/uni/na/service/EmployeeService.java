package it.uni.na.service;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import it.uni.na.model.Employee;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

public class EmployeeService {

    @Inject
    EntityManager em;

    public static List<PanacheEntity> findAllOrderedBy(String mode, Integer page) {
        List<PanacheEntity> return_list;
        PanacheQuery<PanacheEntity> query_result;
        if(page == null || page < 0) {
            page = 0;
        }
        // TODO sostituire 10 con una costante
        // TODO sostituire i case con costanti
        switch (mode) {
            case "byusername":
                return_list = Employee.findAllEmployeesOrderedByUsername().page(Page.of(page,10)).list();
                break;
            case "byemployeerole":
                return_list = Employee.findAllEmployeesOrderedByEmployeeRole().page(Page.of(page,10)).list();
                break;
            case "bylastmodified":
                return_list = Employee.findAllEmployeesOrderedByLastModified().page(Page.of(page,10)).list();
                break;
            default:
                return_list = null;
        }
        return return_list;
    }
    public static Integer findNumberPagesOfEmployees() {
        return Employee.findAllEmployeesOrderedByUsername().page(Page.ofSize(10)).pageCount();
    }
}
