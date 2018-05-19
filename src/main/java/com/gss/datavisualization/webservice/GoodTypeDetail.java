
package com.gss.datavisualization.webservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>good_type_detail complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
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
     * 获取typeCode属性的值。
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
     * 设置typeCode属性的值。
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
     * 获取typeName属性的值。
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
     * 设置typeName属性的值。
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
     * 获取producePlace属性的值。
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
     * 设置producePlace属性的值。
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
