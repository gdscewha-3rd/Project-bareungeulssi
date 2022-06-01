package com.albatross.bareungeulssi.domain.repository;

import com.albatross.bareungeulssi.domain.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {
    Optional<List<Record>> findByLoginId(String loginId);

    @Transactional
    @Modifying
    @Query(value = "Update record r set r.score = :score where r.image_name = :imageName", nativeQuery = true)
    int updateScore(@Param("score") int score, @Param("imageName") String imageName);
}
