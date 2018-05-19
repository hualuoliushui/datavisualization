
package com.gss.datavisualization.webservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>anonymous complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="good_type_details" type="{http://originsystem.scut.com/webservice}good_type_detail" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "goodTypeDetails"
})
@XmlRootElement(name = "getGoodDetailListResponse")
public class GetGoodDetailListResponse {

    @XmlElement(name = "good_type_details")
    protected List<GoodTypeDetail> goodTypeDetails;

    /**
     * Gets the value of the goodTypeDetails property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the goodTypeDetails property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getGoodTypeDetails().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link GoodTypeDetail }
     * 
     * 
     */
    public List<GoodTypeDetail> getGoodTypeDetails() {
        if (goodTypeDetails == null) {
            goodTypeDetails = new ArrayList<GoodTypeDetail>();
        }
        return this.goodTypeDetails;
    }

}
