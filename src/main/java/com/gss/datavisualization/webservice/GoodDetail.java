
package com.gss.datavisualization.webservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>good_detail complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="good_detail">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="good_id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="good_type_id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="good_batch" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="good_code" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="pack_type" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="good_number" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="produce_date" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="life_time" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="qr_code_num" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="star_avg" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "good_detail", propOrder = {
    "id",
    "goodId",
    "goodTypeId",
    "goodBatch",
    "goodCode",
    "packType",
    "goodNumber",
    "produceDate",
    "lifeTime",
    "qrCodeNum",
    "starAvg"
})
public class GoodDetail {

    protected int id;
    @XmlElement(name = "good_id")
    protected int goodId;
    @XmlElement(name = "good_type_id")
    protected int goodTypeId;
    @XmlElement(name = "good_batch", required = true)
    protected String goodBatch;
    @XmlElement(name = "good_code", required = true)
    protected String goodCode;
    @XmlElement(name = "pack_type", required = true)
    protected String packType;
    @XmlElement(name = "good_number")
    protected int goodNumber;
    @XmlElement(name = "produce_date", required = true)
    protected String produceDate;
    @XmlElement(name = "life_time")
    protected int lifeTime;
    @XmlElement(name = "qr_code_num")
    protected int qrCodeNum;
    @XmlElement(name = "star_avg")
    protected double starAvg;

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
     * 获取goodId属性的值。
     * 
     */
    public int getGoodId() {
        return goodId;
    }

    /**
     * 设置goodId属性的值。
     * 
     */
    public void setGoodId(int value) {
        this.goodId = value;
    }

    /**
     * 获取goodTypeId属性的值。
     * 
     */
    public int getGoodTypeId() {
        return goodTypeId;
    }

    /**
     * 设置goodTypeId属性的值。
     * 
     */
    public void setGoodTypeId(int value) {
        this.goodTypeId = value;
    }

    /**
     * 获取goodBatch属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGoodBatch() {
        return goodBatch;
    }

    /**
     * 设置goodBatch属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGoodBatch(String value) {
        this.goodBatch = value;
    }

    /**
     * 获取goodCode属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGoodCode() {
        return goodCode;
    }

    /**
     * 设置goodCode属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGoodCode(String value) {
        this.goodCode = value;
    }

    /**
     * 获取packType属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPackType() {
        return packType;
    }

    /**
     * 设置packType属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPackType(String value) {
        this.packType = value;
    }

    /**
     * 获取goodNumber属性的值。
     * 
     */
    public int getGoodNumber() {
        return goodNumber;
    }

    /**
     * 设置goodNumber属性的值。
     * 
     */
    public void setGoodNumber(int value) {
        this.goodNumber = value;
    }

    /**
     * 获取produceDate属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProduceDate() {
        return produceDate;
    }

    /**
     * 设置produceDate属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProduceDate(String value) {
        this.produceDate = value;
    }

    /**
     * 获取lifeTime属性的值。
     * 
     */
    public int getLifeTime() {
        return lifeTime;
    }

    /**
     * 设置lifeTime属性的值。
     * 
     */
    public void setLifeTime(int value) {
        this.lifeTime = value;
    }

    /**
     * 获取qrCodeNum属性的值。
     * 
     */
    public int getQrCodeNum() {
        return qrCodeNum;
    }

    /**
     * 设置qrCodeNum属性的值。
     * 
     */
    public void setQrCodeNum(int value) {
        this.qrCodeNum = value;
    }

    /**
     * 获取starAvg属性的值。
     * 
     */
    public double getStarAvg() {
        return starAvg;
    }

    /**
     * 设置starAvg属性的值。
     * 
     */
    public void setStarAvg(double value) {
        this.starAvg = value;
    }

}
