package com.electro.entity.waybill;

import com.electro.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
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

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "waybill_log")
public class WaybillLog extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waybill_id", nullable = false)
    @JsonBackReference
    private Waybill waybill;

    @Column(name = "previous_status")
    private Integer previousStatus;

    @Column(name = "current_status")
    private Integer currentStatus;
}
