package it.uni.na.service;

import io.quarkus.panache.mock.PanacheMock;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import it.uni.na.constats.AccountEnum;
import it.uni.na.model.Employee;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;

@QuarkusTest
class EmployeeServiceTest {

    @InjectMock
    Session session;

    private Employee employee;

    @BeforeEach
    void setUp() {
        PanacheMock.mock(Employee.class);
        employee = Mockito.mock(Employee.class);
        Query mockQuery = Mockito.mock(Query.class);
        employee.setId(1L);
        employee.setUsername("Utente01");
        employee.setPassword("Password&1");
        employee.setFirst_login(false);
        employee.setLast_modified(LocalDateTime.now());
        employee.setAccount(AccountEnum.SUPERVISORE);

        Mockito.when(Employee.findEmployeeByUsername(anyString())).thenReturn(employee);
        Mockito.doNothing().when(session).persist(Mockito.any());
        Mockito.when(session.createQuery(Mockito.anyString())).thenReturn(mockQuery);
        Mockito.when(mockQuery.getSingleResult()).thenReturn(0l);
    }

    @Test
    void blankUsername() {
        assertFalse(EmployeeService.evaluateCreateEmployeeService("", "SUPERVISORE", "Password&01"));
    }
    @Test
    void notAsciiUsername() {
        assertFalse(EmployeeService.evaluateCreateEmployeeService("ö", "SUPERVISORE", "Password&01"));
    }
    @Test
    void wrongSizeUsername() {
        assertFalse(EmployeeService.evaluateCreateEmployeeService("t", "SUPERVISORE", "Password&01"));
    }
    @Test
    void existsUsername() {
        assertFalse(EmployeeService.evaluateCreateEmployeeService("Utente01", "SUPERVISORE", "Password&01"));
    }
    @Test
    void correctUsername() {
        Mockito.when(Employee.findEmployeeByUsername("Utente09")).thenReturn(null);
        assertTrue(EmployeeService.evaluateCreateEmployeeService("Utente09", "SUPERVISORE", "Password&01"));
    }
}