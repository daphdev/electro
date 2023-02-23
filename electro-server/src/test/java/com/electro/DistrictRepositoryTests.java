package com.electro;

import com.electro.entity.address.District;
import com.electro.entity.address.Province;
import com.electro.repository.address.DistrictRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.sql.DataSource;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DistrictRepositoryTests {

    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private DistrictRepository districtRepository;

    @Test
    void injectedComponentsAreNotNull() {
        assertThat(dataSource).isNotNull();
        assertThat(jdbcTemplate).isNotNull();
        assertThat(entityManager).isNotNull();
        assertThat(districtRepository).isNotNull();
    }

    @Test
    void findDistrictById() {
        Optional<District> district = districtRepository.findById(1L);

        assertThat(district.orElseGet(District::new).getName()).isEqualTo("Quận 1");
    }

    @Test
    void saveDistrictWithProvinceHavingOnlyId() {

        /*
         * Khi muốn lưu District thì phải nhận DistrictRequest.
         * DistrictRequest có dạng (name: String, code: String, provinceId: Long).
         *
         * Cách tiếp cận cơ bản là map DistrictRequest sang District entity,
         * trong đó provinceId sẽ được map sang thuộc tính (province: Province) của District entity.
         * Để map được như vậy, cần dùng đến hàm findProvinceById của ProvinceRepository.
         * Điều này dẫn đến, cứ lưu một District, thì tạo một truy vấn đến province table.
         *
         * Như vậy, có thể map provinceId sang đối tượng province mà chỉ chứa id thôi được không?
         * Không cần dùng đến findProvinceById của ProvinceRepository, tránh tạo truy vấn.
         *
         * Tức là lúc này, đối tượng province được tạo từ provinceId chỉ chứa mỗi id, các field khác đều null.
         *
         * Test này kiểm tra xem khi lưu một District với provice chỉ có id thì sẽ như thế nào?
         */

        Province province = new Province();
        province.setId(10L);

        District district = new District()
                .setName("Orange County")
                .setCode("12345")
                .setProvince(province);

        District savedDistrict = districtRepository.save(district);

        Optional<District> foundedDistrict = districtRepository.findById(savedDistrict.getId());

        assertThat(foundedDistrict.orElseGet(District::new).getProvince().getId()).isEqualTo(10L);

    }

}
