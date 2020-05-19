package com.example.demo.repository;

import com.example.demo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
    @Query(value = "select * from comment where product_id=:product_id",nativeQuery = true)
    List<Comment> getCommentListByProductID(@Param(value = "product_id") Integer product_id);
}
