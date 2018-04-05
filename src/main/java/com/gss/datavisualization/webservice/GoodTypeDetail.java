
package com.gss.datavisualization.webservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>good_type_detail complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
 * 
 * <pre>
 * &lt;complexType name="good_type_detail">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="good_type_id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="merchant_id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="type_code" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="type_name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="produce_place" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;sequence>
 *           &lt;element name="good_details" type="{http://originsystem.scut.com/webservice}good_detail" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;/sequence>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "good_type_detail", propOrder = {
    "id",
    "goodTypeId",
    "merchantId",
    "typeCode",
    "typeName",
    "producePlace",
    "goodDetails"
})
public class GoodTypeDetail {

    protected int id;
    @XmlElement(name = "good_type_id")
    protected int goodTypeId;
    @XmlElement(name = "merchant_id")
    protected int merchantId;
    @XmlElement(name = "type_code", required = true)
    protected String typeCode;
    @XmlElement(name = "type_name", required = true)
    protected String typeName;
    @XmlElement(name = "produce_place", required = true)
    protected String producePlace;
    @XmlElement(name = "good_details")
    protected List<GoodDetail> goodDetails;

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
     * ��ȡtypeCode���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTypeCode() {
        return typeCode;
    }

    /**
     * ����typeCode���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTypeCode(String value) {
        this.typeCode = value;
    }

    /**
     * ��ȡtypeName���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTypeName() {
        return typeName;
    }

    /**
     * ����typeName���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTypeName(String value) {
        this.typeName = value;
    }

    /**
     * ��ȡproducePlace���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProducePlace() {
        return producePlace;
    }

    /**
     * ����producePlace���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProducePlace(String value) {
        this.producePlace = value;
    }

    /**
     * Gets the value of the goodDetails property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the goodDetails property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getGoodDetails().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link GoodDetail }
     * 
     * 
     */
    public List<GoodDetail> getGoodDetails() {
        if (goodDetails == null) {
            goodDetails = new ArrayList<GoodDetail>();
        }
        return this.goodDetails;
    }

}
