package com.electro.entity.client;

import com.electro.entity.BaseEntity;
import com.electro.entity.authentication.User;
import com.electro.entity.product.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "review", uniqueConstraints = @UniqueConstraint(name = "uc_review", columnNames = {"user_id", "product_id"}))
public class Review extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "rating_score", nullable = false, columnDefinition = "TINYINT")
    private Integer ratingScore;

    @Column(name = "content", nullable = false)
    private String content;

    // TODO: 6 trạng thái: Chưa duyệt, Đã duyệt, Không duyệt, Cập nhật chưa duyệt, Cập nhật đã duyệt, Cập nhật không duyệt
    @Column(name = "status", nullable = false, columnDefinition = "TINYINT")
    private Integer status;
}
