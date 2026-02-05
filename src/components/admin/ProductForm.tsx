import { useState, useEffect, useRef } from "react";
import { Product } from "../../types/product";
import { adminProductsAPI, uploadImage } from "../../API/admin/api";
import { getCategories, getSubcategories } from "../../API/products/api";
import "./ProductForm.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    nom: "",
    ref: "",
    url_image: "",
    description: "",
    format: "",
    net_socofra: "",
    public_ht: "",
    garage: "",
    stock_quantity: "",
    stock_alert_threshold: "10",
    sku: "",
    is_bestseller: false,
    is_promotion: false,
    promotion_percentage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const categoriesList = await getCategories();
        setCategories(categoriesList);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadSubcategories = async () => {
      if (formData.category) {
        try {
          const subcategoriesList = await getSubcategories(formData.category);
          setSubcategories(subcategoriesList);
        } catch (err) {
          console.error("Erreur lors du chargement des sous-catégories:", err);
          setSubcategories([]);
        }
      } else {
        setSubcategories([]);
      }
    };

    loadSubcategories();
  }, [formData.category]);

  useEffect(() => {
    if (product) {
      setFormData({
        category: product.category || "",
        subcategory: product.subcategory || "",
        nom: product.nom || "",
        ref: product.ref || "",
        url_image: product.url_image || "",
        description: product.description || "",
        format: product.format || "",
        net_socofra: product.net_socofra?.toString() || "",
        public_ht: product.public_ht?.toString() || "",
        garage: product.garage?.toString() || "",
        stock_quantity: product.stockQuantity?.toString() || "0",
        stock_alert_threshold: product.stockAlertThreshold?.toString() || "10",
        sku: product.sku || "",
        is_bestseller: product.is_bestseller || false,
        is_promotion: product.is_promotion || false,
        promotion_percentage: product.promotion_percentage?.toString() || "",
      });
      if (product.url_image) {
        setImagePreview(product.url_image);
      }
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? value
            : value,
      };

      // Si la catégorie change, réinitialiser la sous-catégorie
      if (name === "category") {
        newData.subcategory = "";
      }

      return newData;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Type de fichier non autorisé. Formats acceptés: JPEG, PNG, WebP");
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Le fichier est trop volumineux. Taille maximale: 5MB");
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      // Aperçu local
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload vers Supabase
      const result = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        url_image: result.data.url,
      }));
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'upload de l'image");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      url_image: "",
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const productData: any = {
        category: formData.category || undefined,
        subcategory: formData.subcategory || undefined,
        nom: formData.nom,
        ref: formData.ref,
        url_image: formData.url_image || undefined,
        description: formData.description || undefined,
        format: formData.format || undefined,
        net_socofra: formData.net_socofra ? parseFloat(formData.net_socofra) : undefined,
        public_ht: formData.public_ht ? parseFloat(formData.public_ht) : undefined,
        garage: formData.garage ? parseFloat(formData.garage) : undefined,
        stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity, 10) : 0,
        stock_alert_threshold: formData.stock_alert_threshold ? parseInt(formData.stock_alert_threshold, 10) : 10,
        sku: formData.sku || undefined,
        is_bestseller: formData.is_bestseller,
        is_promotion: formData.is_promotion,
        promotion_percentage: formData.promotion_percentage
          ? parseInt(formData.promotion_percentage)
          : undefined,
      };

      if (isEditing && product) {
        await adminProductsAPI.updateProduct(product.id, productData);
      } else {
        await adminProductsAPI.createProduct(productData);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-overlay" onClick={onClose}>
      <div className="product-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="product-form-header">
          <h2>{isEditing ? "Modifier le produit" : "Créer un produit"}</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {error && (
          <div className="product-form-error">
            <i className="bi bi-exclamation-triangle"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                Nom du produit <span className="required">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Nom du produit"
              />
            </div>

            <div className="form-group">
              <label>
                Référence <span className="required">*</span>
              </label>
              <input
                type="text"
                name="ref"
                value={formData.ref}
                onChange={handleChange}
                required
                placeholder="REF-001"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="SKU-001"
              />
            </div>

            <div className="form-group">
              <label>Quantité en stock</label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Seuil d'alerte stock</label>
              <input
                type="number"
                name="stock_alert_threshold"
                value={formData.stock_alert_threshold}
                onChange={handleChange}
                min="0"
                placeholder="10"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loadingCategories}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {loadingCategories && (
                <span className="loading-hint">Chargement des catégories...</span>
              )}
            </div>

            <div className="form-group">
              <label>Sous-catégorie</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                disabled={!formData.category}
              >
                <option value="">Sélectionner une sous-catégorie</option>
                {subcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
              {!formData.category && (
                <span className="form-hint">Sélectionnez d'abord une catégorie</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Image du produit</label>
            <div className="image-upload-container">
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Aperçu" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={handleRemoveImage}
                    disabled={uploadingImage}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              )}
              <div className="image-upload-input">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  disabled={uploadingImage}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="upload-label">
                  {uploadingImage ? (
                    <>
                      <i className="bi bi-hourglass-split"></i>
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-cloud-upload"></i>
                      {imagePreview ? "Changer l'image" : "Choisir une image"}
                    </>
                  )}
                </label>
                <span className="upload-hint">
                  Formats acceptés: JPEG, PNG, WebP (max 5MB)
                </span>
              </div>
              {formData.url_image && !imagePreview && (
                <div className="image-url-fallback">
                  <span>URL actuelle: </span>
                  <a
                    href={formData.url_image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formData.url_image}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Description du produit"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Format</label>
              <input
                type="text"
                name="format"
                value={formData.format}
                onChange={handleChange}
                placeholder="Format"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Prix</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Prix HT public (€)</label>
                <input
                  type="number"
                  name="public_ht"
                  value={formData.public_ht}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Prix net Socofra (€)</label>
                <input
                  type="number"
                  name="net_socofra"
                  value={formData.net_socofra}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Prix garage (€)</label>
                <input
                  type="number"
                  name="garage"
                  value={formData.garage}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Options</h3>
            <div className="form-checkboxes">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_bestseller"
                  checked={formData.is_bestseller}
                  onChange={handleChange}
                />
                <span>Bestseller</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_promotion"
                  checked={formData.is_promotion}
                  onChange={handleChange}
                />
                <span>Promotion</span>
              </label>
            </div>

            {formData.is_promotion && (
              <div className="form-group">
                <label>Pourcentage de réduction (%)</label>
                <input
                  type="number"
                  name="promotion_percentage"
                  value={formData.promotion_percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="0"
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <i className="bi bi-hourglass-split"></i> Enregistrement...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg"></i>{" "}
                  {isEditing ? "Modifier" : "Créer"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

