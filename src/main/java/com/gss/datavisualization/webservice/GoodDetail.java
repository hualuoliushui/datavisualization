
package com.gss.datavisualization.webservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>good_detail complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
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
     * ��ȡgoodId���Ե�ֵ��
     * 
     */
    public int getGoodId() {
        return goodId;
    }

    /**
     * ����goodId���Ե�ֵ��
     * 
     */
    public void setGoodId(int value) {
        this.goodId = value;
    }

    /**
     * ��ȡgoodTypeId���Ե�ֵ��
     * 
     */
    public int getGoodTypeId() {
        return goodTypeId;
    }

    /**
     * ����goodTypeId���Ե�ֵ��
     * 
     */
    public void setGoodTypeId(int value) {
        this.goodTypeId = value;
    }

    /**
     * ��ȡgoodBatch���Ե�ֵ��
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
     * ����goodBatch���Ե�ֵ��
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
     * ��ȡgoodCode���Ե�ֵ��
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
     * ����goodCode���Ե�ֵ��
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
     * ��ȡpackType���Ե�ֵ��
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
     * ����packType���Ե�ֵ��
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
     * ��ȡgoodNumber���Ե�ֵ��
     * 
     */
    public int getGoodNumber() {
        return goodNumber;
    }

    /**
     * ����goodNumber���Ե�ֵ��
     * 
     */
    public void setGoodNumber(int value) {
        this.goodNumber = value;
    }

    /**
     * ��ȡproduceDate���Ե�ֵ��
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
     * ����produceDate���Ե�ֵ��
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
     * ��ȡlifeTime���Ե�ֵ��
     * 
     */
    public int getLifeTime() {
        return lifeTime;
    }

    /**
     * ����lifeTime���Ե�ֵ��
     * 
     */
    public void setLifeTime(int value) {
        this.lifeTime = value;
    }

    /**
     * ��ȡqrCodeNum���Ե�ֵ��
     * 
     */
    public int getQrCodeNum() {
        return qrCodeNum;
    }

    /**
     * ����qrCodeNum���Ե�ֵ��
     * 
     */
    public void setQrCodeNum(int value) {
        this.qrCodeNum = value;
    }

    /**
     * ��ȡstarAvg���Ե�ֵ��
     * 
     */
    public double getStarAvg() {
        return starAvg;
    }

    /**
     * ����starAvg���Ե�ֵ��
     * 
     */
    public void setStarAvg(double value) {
        this.starAvg = value;
    }

}
