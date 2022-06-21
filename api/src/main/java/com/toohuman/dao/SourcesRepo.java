package com.toohuman.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.toohuman.model.Sources;

public interface SourcesRepo extends JpaRepository<Sources, Integer>{

	@Query("from Sources where collection LIKE %?1%")
	List<Sources> findByCollection(String collection);

	@Query("from Sources where sourceNumber=?1")
	List<Sources> findBySourceNumber(double sourceNumber);
	
	@Query("from Sources where FLOOR(sourceNumber) = FLOOR(?1)")
	List<Sources> findByRoundedSourceNumber(double sourceNumber);

	@Query("from Sources where author LIKE %?1%")
	List<Sources> findByAuthor(String author);
	
	@Query("from Sources where callNumber LIKE %?1%")
	List<Sources> findByCallNumber(String callNumber);

	@Query("from Sources where title LIKE %?1%")
	List<Sources> findByTitle(String title);

	@Query("from Sources where inscription LIKE %?1%")
	List<Sources> findByInscription(String inscription);

	@Query("from Sources where description LIKE %?1%")
	List<Sources> findByDescription(String description);
}
