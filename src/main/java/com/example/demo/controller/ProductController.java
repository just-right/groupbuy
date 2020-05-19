package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductCategory;
import com.example.demo.service.IProductCategoryService;
import com.example.demo.service.IProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductController implements IProductController {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IProductService productService;
    @Autowired
    private IProductCategoryService categoryService;
    private static Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Override
    public Map<String, Object> productCreate(int merchant_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url) {
        Product product = productService.productCreate(merchant_id, activity_id, category_id, product_name, product_price, product_amount, clusternumber, limitamount, product_introduction, image_url);
        return publicProduct(product);
    }

    @Override
    public Map<String, Object> productUpdate(int product_id, int activity_id, int category_id, String product_name, float product_price, int product_amount, int clusternumber, int limitamount, String product_introduction, String image_url) {
        Product product = productService.productUpdate(product_id, activity_id, category_id, product_name, product_price, product_amount, clusternumber, limitamount, product_introduction, image_url);
        return publicProduct(product);
    }

    @Override
    public Map<String, Object> productDelete(int product_id) {
        Map<String, Object> resMap = new HashMap<>();
        productService.productDelete(product_id);
        resMap.put("code", 200);
        resMap.put("msg", "success");
        return resMap;
    }

    @Override
    public Map<String, Object> productCheck(int product_id) {
        Product product = productService.productCheck(product_id);
        return publicProduct(product);
    }


    @Override
    public Map<String, Object> getProductById(int product_id) {
        Product product = productService.getProductById(product_id);
        return publicProduct(product);
    }

    @Override
    public Map<String, Object> getProductListCheck() {
        List<Product> productList = productService.getProductListCheck();
        List<Product> resProductList = new ArrayList<>();
        for (Product product:productList){
            int merchantID = product.getMerchant_ID();
            Map<String, Object> resMap = new HashMap<>();

            resMap = restTemplate.getForObject("http://user-service/api/merchant/" + merchantID + "/normal", HashMap.class);

            if ((int) resMap.get("code") == 200) {
                resProductList.add(product);
            }

        }
        return publicGetProductList(resProductList);
    }

    @Override
    public Map<String, Object> getMerchantIDByProductID(int product_id) {
        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> tmpMapA = new HashMap<>();
        int merchant_id = productService.getMerchantIDByProductID(product_id);
        resMap.put("code", 200);
        resMap.put("msg", "success");

        tmpMapA.put("product_id", product_id);
        tmpMapA.put("merchant_id", merchant_id);

        resMap.put("data", tmpMapA);
        return resMap;
    }


    @Override
    public Map<String, Object> getProductListNoraml(String address, String municipalityFlag) {
        List<Product> productList = productService.getProductListNoraml();
        List<Product> resProductList = new ArrayList<>();
        for (Product product : productList) {

            int merchant_ID = product.getMerchant_ID();

            Map<String, Object> resMap = new HashMap<>();
            Map<String, Object> tmpMap = new HashMap<>();

            resMap = restTemplate.getForObject("http://user-service/api/merchant/" + merchant_ID + "/normal", HashMap.class);

            if ((int) resMap.get("code") == 200) {
                tmpMap = (HashMap<String, Object>) resMap.get("data");


                String city = (String) tmpMap.get("address");


                if (municipalityFlag.equals("1")) {
                    if (!address.split(",")[0].equals(city.split(",")[0])) {
                        continue;
                    }
                } else {
//               logger.info("地址："+address);
//                logger.info("地址："+city);
                    if (!address.equals(city)) {
                        continue;
                    }
//                System.out.println("地址："+address);
                }
                resProductList.add(product);
            }


        }
        return publicGetProductList(resProductList);
    }


    @Override
    public Map<String, Object> getProductListNoramlForAdmin() {
        List<Product> productList = productService.getProductListNoraml();
        List<Product> resProductList = new ArrayList<>();
        for (Product product:productList){
            int merchantID = product.getMerchant_ID();
            Map<String, Object> resMap = new HashMap<>();

            resMap = restTemplate.getForObject("http://user-service/api/merchant/" + merchantID + "/normal", HashMap.class);

            if ((int) resMap.get("code") == 200) {
                resProductList.add(product);
            }

        }
        return publicGetProductList(resProductList);
    }

    @Override
    public Map<String, Object> getProductListNoramlByKeyword(String keyword, String address, String municipalityFlag) {
        List<Product> productList = productService.getProductListNoramlByKeyword(keyword);
        List<Product> resProductList = new ArrayList<>();
        for (Product product : productList) {
            int merchant_ID = product.getMerchant_ID();

            Map<String, Object> resMap = new HashMap<>();
            Map<String, Object> tmpMap = new HashMap<>();
            resMap = restTemplate.getForObject("http://user-service/api/merchant/" + merchant_ID + "/normal", HashMap.class);
            if ((int) resMap.get("code") == 200) {
                tmpMap = (HashMap<String, Object>) resMap.get("data");
                String city = (String) tmpMap.get("address");

                if (municipalityFlag.equals("1")) {
                    if (!address.split(",")[0].equals(city.split(",")[0])) {
                        continue;
                    }
                } else {
                    logger.info("地址1：" + address);
                    logger.info("地址2：" + city);
                    if (!address.equals(city)) {
                        continue;
                    }
//                System.out.println("地址："+address);
                }
                resProductList.add(product);
            }


        }


        return publicGetProductList(resProductList);
    }

    @Override
    public Map<String, Object> getProductListByMerchantID(int merchant_id) {
        List<Product> productList = productService.getProductListByMerchantID(merchant_id);
        return publicGetProductList(productList);
    }


    @Override
    public Map<String, Object> getProductListByCategoryID(int category_id, String address, String municipalityFlag) {
        List<Product> productList = productService.getProductListByCategoryID(category_id);
        List<Product> resProductList = new ArrayList<>();
        for (Product product : productList) {
            int merchant_ID = product.getMerchant_ID();

            Map<String, Object> resMap = new HashMap<>();
            Map<String, Object> tmpMap = new HashMap<>();
            resMap = restTemplate.getForObject("http://user-service/api/merchant/" + merchant_ID + "/normal", HashMap.class);
            if ((int)resMap.get("code")==200) {
                tmpMap = (HashMap<String, Object>) resMap.get("data");
                String city = (String) tmpMap.get("address");

                if (municipalityFlag.equals("1")) {
                    if (!address.split(",")[0].equals(city.split(",")[0])) {
                        continue;
                    }
                } else {
                    logger.info("地址1：" + address);
                    logger.info("地址2：" + city);
                    if (!address.equals(city)) {
                        continue;
                    }
//                System.out.println("地址："+address);
                }
                resProductList.add(product);
            }


        }


        return publicGetProductList(resProductList);
    }

    @Override
    public Map<String, Object> reduceStockByProductID(int product_id, int quantity) {
        Product product = productService.reduceStockByProductID(product_id, quantity);
        return publicProduct(product);
    }

    public Map<String, Object> publicProduct(Product product) {
        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> tmpMapA = new HashMap<>();
        Map<String, Object> tmpMapB = new HashMap<>();
        resMap.put("code", 200);
        resMap.put("msg", "success");

        tmpMapA.put("product_id", product.getProduct_ID());
        tmpMapA.put("merchant_id", product.getMerchant_ID());
        tmpMapA.put("activity_id", product.getActivity_ID());
        tmpMapA.put("category_id", product.getCategory_ID());
        tmpMapA.put("product_name", product.getProduct_Name());
        tmpMapA.put("product_price", product.getProduct_Price());
        tmpMapA.put("product_amount", product.getProduct_Amount());
        tmpMapA.put("clusternumber", product.getClusterNumber());
        tmpMapA.put("limitamount", product.getLimitAmount());
        tmpMapA.put("product_introduction", product.getProduct_Introduction());
        tmpMapA.put("image_url", product.getImage_Url());
        tmpMapA.put("product_status", product.getProduct_Status());

        tmpMapB.put("id", product.getCategory_ID());
        ProductCategory category = categoryService.getCategoryById(product.getCategory_ID());
        tmpMapB.put("category_name", category.getCategory_Name());

        tmpMapA.put("productcategory", tmpMapB);

        resMap.put("data", tmpMapA);
        return resMap;
    }


    public Map<String, Object> publicGetProductList(List<Product> productList) {
        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> tmpMap = new HashMap<>();
        List<Map<String, Object>> mapList = new ArrayList<>();

        resMap.put("code", 200);
        resMap.put("msg", "success");
        int count = productList.size();
        tmpMap.put("count", count);
        //tmpMap.put("rows",productList);
        for (Product product : productList) {
            Map<String, Object> tmpMapA = new HashMap<>();
            Map<String, Object> tmpMapB = new HashMap<>();
            tmpMapA.put("product_id", product.getProduct_ID());
            tmpMapA.put("merchant_id", product.getMerchant_ID());
            tmpMapA.put("activity_id", product.getActivity_ID());
            tmpMapA.put("category_id", product.getCategory_ID());
            tmpMapA.put("product_name", product.getProduct_Name());
            tmpMapA.put("product_price", product.getProduct_Price());
            tmpMapA.put("product_amount", product.getProduct_Amount());
            tmpMapA.put("clusternumber", product.getClusterNumber());
            tmpMapA.put("limitamount", product.getLimitAmount());
            tmpMapA.put("product_introduction", product.getProduct_Introduction());
            tmpMapA.put("image_url", product.getImage_Url());
            tmpMapA.put("product_status", product.getProduct_Status());

            tmpMapB.put("id", product.getCategory_ID());
            ProductCategory category = categoryService.getCategoryById(product.getCategory_ID());
            tmpMapB.put("category_name", category.getCategory_Name());

            tmpMapA.put("productcategory", tmpMapB);
            mapList.add(tmpMapA);
        }
        tmpMap.put("rows", mapList);
        resMap.put("data", tmpMap);
        return resMap;
    }

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    public String sendInfo(){
        return "hello";
    }
}
