package com.albatross.bareungeulssi.domain.repository;

import com.albatross.bareungeulssi.domain.entity.Literature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LiteratureRepository extends JpaRepository<Literature, Long> {

    //List<Literature> findByTitle(String title);
    //List<Literature> findByAuthor(String author);
    //@Query(value = "select id, title, author, plot from literature", nativeQuery = true)
    //@Query(value = "select l from Literature l")
    List<Literature> findAll();

    //@Query("select l from Literature l where l.author like %:author% order by l.id")
    List<Literature> findByAuthor(@Param("author") String author);

    //@Query("select l from Literature l where l.title like %:title% order by l.id")
    Literature findByTitle(@Param("title") String title);

    //@Query("select l from Literature l where l.id like %:id%")
    Optional<Literature> findById(@Param("id") Long id);

    //@Query("select l from Literature l where l.checkNew like %:checkNew%")
    //List<Literature> findByCheckNew(@Param("checkNew")Boolean checkNew);

    //@Query("select l from Literature l where l.checkBest like %:checkBest%")
    //List<Literature> findByCheckBest(@Param("checkBest")Boolean checkBest);

}
