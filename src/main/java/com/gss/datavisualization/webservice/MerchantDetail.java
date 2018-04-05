
package com.gss.datavisualization.webservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>merchant_detail complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
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
     * ��ȡid���Ե�ֵ��
     * 
     */
    public int getId() {
        return id;
    }

    /**
     * ����id���Ե�ֵ��
     * 
     */
    public void setId(int value) {
        this.id = value;
    }

    /**
     * ��ȡmerchantId���Ե�ֵ��
     * 
     */
    public int getMerchantId() {
        return merchantId;
    }

    /**
     * ����merchantId���Ե�ֵ��
     * 
     */
    public void setMerchantId(int value) {
        this.merchantId = value;
    }

    /**
     * ��ȡcreateDate���Ե�ֵ��
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
     * ����createDate���Ե�ֵ��
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
     * ��ȡuserName���Ե�ֵ��
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
     * ����userName���Ե�ֵ��
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
     * ��ȡmerchantName���Ե�ֵ��
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
     * ����merchantName���Ե�ֵ��
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
     * ��ȡcompanyName���Ե�ֵ��
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
     * ����companyName���Ե�ֵ��
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
     * ��ȡcompanyArea���Ե�ֵ��
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
     * ����companyArea���Ե�ֵ��
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
     * ��ȡareaCode���Ե�ֵ��
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
     * ����areaCode���Ե�ֵ��
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
     * ��ȡgisLocation���Ե�ֵ��
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
     * ����gisLocation���Ե�ֵ��
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
     * ��ȡcompanyCode���Ե�ֵ��
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
     * ����companyCode���Ե�ֵ��
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
     * ��ȡbusinessScope���Ե�ֵ��
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
     * ����businessScope���Ե�ֵ��
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
