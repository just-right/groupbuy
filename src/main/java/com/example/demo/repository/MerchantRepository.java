package com.example.demo.repository;

import com.example.demo.entity.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface MerchantRepository extends JpaRepository<Merchant,Integer> {
    @Query(value = "select * from merchant where account_name=:account_name and account_password=:account_password limit 1;", nativeQuery = true)
    Merchant getMerchantbyNameAndPwd(@Param(value = "account_name") String account_name, @Param(value = "account_password") String account_password);

    @Transactional
    @Modifying
    @Query(value = "update merchant set store_contactname=:store_contactname,telephonenumber=:telephonenumber,address=:address,account_password=:account_password where merchant_id=:merchant_id",nativeQuery = true)
    Integer updateMerchant(@Param(value = "store_contactname") String store_contactname,@Param(value = "telephonenumber") String telephonenumber,@Param(value = "address") String address,@Param(value = "account_password") String account_password, @Param(value = "merchant_id")Integer merchant_id);

    @Query(value = "select * from merchant where merchant_id=:merchant_id and account_status=2 limit 1", nativeQuery = true)
    Merchant getMerchantByIdNormal(@Param(value = "merchant_id") Integer merchant_id);

    @Query(value = "select * from merchant where merchant_id=:merchant_id and account_status=3 limit 1", nativeQuery = true)
    Merchant getMerchantByIdBanned(@Param(value = "merchant_id") Integer merchant_id);

    @Query(value = "select * from merchant where merchant_id=:merchant_id and account_status=1 limit 1", nativeQuery = true)
    Merchant getMerchantByIdApply(@Param(value = "merchant_id") Integer merchant_id);

    @Query(value = "select * from merchant where account_status=2", nativeQuery = true)
    List<Merchant> getMerchantListNormal();

    @Query(value = "select * from merchant where account_status=3", nativeQuery = true)
    List<Merchant> getMerchantListBanned();

    @Query(value = "select * from merchant where account_status=1", nativeQuery = true)
    List<Merchant> getMerchantListApply();

    @Query(value = "select * from merchant where account_name=:account_name limit 1", nativeQuery = true)
    Merchant merchantRegisterCheckbyAccount(@Param(value = "account_name")String account_name);

    @Query(value = "select * from merchant where telephonenumber=:telephonenumber limit 1", nativeQuery = true)
    Merchant merchantRegisterCheckbyTel(@Param(value = "telephonenumber")String telephonenumber);

    @Query(value = "select * from merchant where store_name=:store_name limit 1", nativeQuery = true)
    Merchant merchantRegisterCheckbyStoreName(@Param(value = "store_name")String store_name);


}
