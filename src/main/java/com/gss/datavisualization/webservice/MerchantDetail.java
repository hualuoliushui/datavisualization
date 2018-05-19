
package com.gss.datavisualization.webservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>merchant_detail complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="merchant_detail">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="merchant_id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="create_date" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="user_name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="merchant_name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="company_name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="company_area" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="area_code" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="gis_location" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="company_code" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="business_scope" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "merchant_detail", propOrder = {
    "id",
    "merchantId",
    "createDate",
    "userName",
    "merchantName",
    "companyName",
    "companyArea",
    "areaCode",
    "gisLocation",
    "companyCode",
    "businessScope"
})
public class MerchantDetail {

    protected int id;
    @XmlElement(name = "merchant_id")
    protected int merchantId;
    @XmlElement(name = "create_date", required = true)
    protected String createDate;
    @XmlElement(name = "user_name", required = true)
    protected String userName;
    @XmlElement(name = "merchant_name", required = true)
    protected String merchantName;
    @XmlElement(name = "company_name", required = true)
    protected String companyName;
    @XmlElement(name = "company_area", required = true)
    protected String companyArea;
    @XmlElement(name = "area_code", required = true)
    protected String areaCode;
    @XmlElement(name = "gis_location", required = true)
    protected String gisLocation;
    @XmlElement(name = "company_code", required = true)
    protected String companyCode;
    @XmlElement(name = "business_scope", required = true)
    protected String businessScope;

    /**
     * 获取id属性的值。
     * 
     */
    public int getId() {
        return id;
    }

    /**
     * 设置id属性的值。
     * 
     */
    public void setId(int value) {
        this.id = value;
    }

    /**
     * 获取merchantId属性的值。
     * 
     */
    public int getMerchantId() {
        return merchantId;
    }

    /**
     * 设置merchantId属性的值。
     * 
     */
    public void setMerchantId(int value) {
        this.merchantId = value;
    }

    /**
     * 获取createDate属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCreateDate() {
        return createDate;
    }

    /**
     * 设置createDate属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCreateDate(String value) {
        this.createDate = value;
    }

    /**
     * 获取userName属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置userName属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUserName(String value) {
        this.userName = value;
    }

    /**
     * 获取merchantName属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMerchantName() {
        return merchantName;
    }

    /**
     * 设置merchantName属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMerchantName(String value) {
        this.merchantName = value;
    }

    /**
     * 获取companyName属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCompanyName() {
        return companyName;
    }

    /**
     * 设置companyName属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCompanyName(String value) {
        this.companyName = value;
    }

    /**
     * 获取companyArea属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCompanyArea() {
        return companyArea;
    }

    /**
     * 设置companyArea属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCompanyArea(String value) {
        this.companyArea = value;
    }

    /**
     * 获取areaCode属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAreaCode() {
        return areaCode;
    }

    /**
     * 设置areaCode属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAreaCode(String value) {
        this.areaCode = value;
    }

    /**
     * 获取gisLocation属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGisLocation() {
        return gisLocation;
    }

    /**
     * 设置gisLocation属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGisLocation(String value) {
        this.gisLocation = value;
    }

    /**
     * 获取companyCode属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCompanyCode() {
        return companyCode;
    }

    /**
     * 设置companyCode属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCompanyCode(String value) {
        this.companyCode = value;
    }

    /**
     * 获取businessScope属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBusinessScope() {
        return businessScope;
    }

    /**
     * 设置businessScope属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBusinessScope(String value) {
        this.businessScope = value;
    }

}
