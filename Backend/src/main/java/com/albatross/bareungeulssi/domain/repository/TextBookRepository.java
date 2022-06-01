package com.albatross.bareungeulssi.domain.repository;

import com.albatross.bareungeulssi.domain.entity.TextBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TextBookRepository extends JpaRepository<TextBook, Long> {

    TextBook findByLiteratureIdAndPageAndFontPath(Long literatureId, Integer page, String fontPath); //문학작품 아이디와 폰트 아이디로 교본 분석 결과 찾기
    TextBook findByFontPath(String fontPath);
}
