package com.projectbook.bookStore.controllerTest;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectbook.bookStore.controller.BooksController;
import com.projectbook.bookStore.model.Books;
import com.projectbook.bookStore.services.BookServices;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value=BooksController.class)
public class BooksControllerTest {
    @Autowired
    private MockMvc mockMvc;
   @MockBean
   private BookServices bookServices;
  @Test
  private void testSaveTicket() throws Exception{
    Books book = new Books();
    book.setId(1);
    book.setAuthor("Shivam");
    book.setGenre("Drama");
    book.setIsbnNumber(1234);
    book.setLanguage("enlgish");
    book.setTitle("Hero");
    book.setPrice(67.67);
    String expectedJson = this.mapToJson(book);
    Mockito.when(bookServices.saveBooks(book)).thenReturn(book);
    String URI = "/books";
    RequestBuilder requestBuilder = MockMvcRequestBuilders
    .post(URI)
    .accept(MediaType.APPLICATION_JSON);
    MvcResult result=mockMvc.perform(requestBuilder).andReturn();
    MockHttpServletResponse response = result.getResponse();
    String outputInJson =response.getContentAsString();
    assertThat(outputInJson).isEqualTo(expectedJson);
    assertEquals(HttpStatus.OK.value(),response.getStatus());

  }
private String mapToJson(Object object) throws JsonProcessingException {
    ObjectMapper objectMapper=new ObjectMapper();

    return objectMapper.writeValueAsString(object);
}
  @Test
  private void testGetBookById() throws Exception{
    Books book = new Books();
    book.setId(1);
    book.setAuthor("Shivam");
    book.setGenre("Drama");
    book.setIsbnNumber(1234);
    book.setLanguage("enlgish");
    book.setTitle("Hero");
    book.setPrice(67.67);
    
    Mockito.when(bookServices.getOneBooks(Mockito.anyInt())).thenReturn(book);
    String URI = "/books/1";
    RequestBuilder requestBuilder = MockMvcRequestBuilders
    .get(URI)
    .accept(MediaType.APPLICATION_JSON);
    MvcResult result=mockMvc.perform(requestBuilder).andReturn();
    String expectedJson = this.mapToJson(book);
    String outputInJson =result.getResponse().getContentAsString();
    assertThat(outputInJson).isEqualTo(expectedJson);
    
  }

    
}
