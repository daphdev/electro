package com.electro.entity.order;

import com.electro.entity.BaseEntity;
import com.electro.entity.authentication.User;
import com.electro.entity.cashbook.PaymentMethodType;
import com.electro.entity.inventory.Docket;
import com.electro.entity.waybill.Waybill;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "`order`")
public class Order extends BaseEntity {
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Column(name = "status", nullable = false, columnDefinition = "TINYINT")
    private Integer status;

    @Column(name = "to_name", nullable = false)
    private String toName;

    @Column(name = "to_phone", nullable = false)
    private String toPhone;

    @Column(name = "to_address", nullable = false)
    private String toAddress;

    @Column(name = "to_ward_name", nullable = false)
    private String toWardName;

    @Column(name = "to_district_name", nullable = false)
    private String toDistrictName;

    @Column(name = "to_province_name", nullable = false)
    private String toProvinceName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_resource_id", nullable = false)
    @JsonBackReference
    private OrderResource orderResource;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_cancellation_reason_id")
    @JsonBackReference
    private OrderCancellationReason orderCancellationReason;

    @Column(name = "note")
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderVariant> orderVariants = new HashSet<>();

    @Column(name = "total_amount", nullable = false, columnDefinition = "DECIMAL(15,5)")
    private BigDecimal totalAmount;

    @Column(name = "tax", nullable = false, columnDefinition = "DECIMAL(15,5)")
    private BigDecimal tax;

    @Column(name = "shipping_cost", nullable = false, columnDefinition = "DECIMAL(15,5)")
    private BigDecimal shippingCost;

    @Column(name = "total_pay", nullable = false, columnDefinition = "DECIMAL(15,5)")
    private BigDecimal totalPay;

    @OneToOne(mappedBy = "order")
    private Waybill waybill;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Docket> dockets = new ArrayList<>();

    @Column(name = "payment_method_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethodType paymentMethodType;

    // 2 trạng thái: (1) Chưa thanh toán, (2) Đã thanh toán
    @Column(name = "payment_status", nullable = false, columnDefinition = "TINYINT")
    private Integer paymentStatus;

    @Column(name = "paypal_order_id")
    private String paypalOrderId;

    @Column(name = "paypal_order_status")
    private String paypalOrderStatus;

    // vouchers: List<Voucher>
}
