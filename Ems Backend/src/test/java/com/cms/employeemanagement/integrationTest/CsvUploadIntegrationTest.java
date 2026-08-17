package com.cms.employeemanagement.integrationTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class CsvUploadIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testUploadCsv() throws Exception {

        MockMultipartFile file =
                new MockMultipartFile(
                        "file",
                        "employees.csv",
                        "text/csv",
                        new ClassPathResource("employees.csv")
                                .getInputStream());

        mockMvc.perform(
                multipart("/api/employees/upload")
                        .file(file))
                .andExpect(status().isOk());

    }

}