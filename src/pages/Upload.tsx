
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload as UploadIcon, AlertCircle, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';

// Sample options for dropdowns
const categoryOptions = [
  "Scriptures", "Dance Forms", "Art Forms", "Sculptures", 
  "Festivals", "Music", "Costumes & Textiles", "Folktales"
];

const eraOptions = [
  "Ancient", "Vedic Period", "Epic Period", "Classical",
  "Medieval", "Mughal Era", "Colonial", "Modern", "Contemporary"
];

const regionOptions = [
  "North India", "South India", "East India", "West India",
  "Northeast India", "Central India", "Andhra Pradesh", "Assam",
  "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand",
  "Uttar Pradesh", "West Bengal"
];

const styleOptions = [
  "Classical", "Folk", "Tribal", "Religious", "Royal Court", 
  "Fusion", "Contemporary", "Temple", "Rural", "Urban"
];

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    era: '',
    region: '',
    style: '',
    author: '',
  });
  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };
  
  const clearThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields", {
        description: "Title, description, and category are required."
      });
      return;
    }
    
    // Show submitting state
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      console.log('Submitted data:', { ...formData, thumbnail, files });
      toast.success("Content submitted successfully", {
        description: "Your contribution will be reviewed and published soon."
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      era: '',
      region: '',
      style: '',
      author: '',
    });
    setThumbnail(null);
    setThumbnailPreview(null);
    setFiles(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Upload Header */}
        <section className="bg-gradient-to-r from-cultural-silk to-white py-10 border-b">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-cultural-saffron mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to home</span>
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Upload Cultural Content</h1>
                <p className="text-gray-600">Share your cultural knowledge with the community</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upload Form */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {submitted ? (
                <div className="p-8 text-center">
                  <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You for Your Contribution!</h2>
                  <p className="text-gray-600 mb-6">
                    Your submission has been received and will be reviewed by our team. 
                    You'll receive a notification once it's published to the Cultural Hub.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-cultural-saffron text-white rounded-lg hover:bg-cultural-saffron/90 transition-colors"
                    >
                      Upload Another Item
                    </button>
                    <Link 
                      to="/"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Return to Home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6">Content Information</h2>
                    
                    {/* Title */}
                    <div className="mb-5">
                      <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title <span className="text-red-500">*</span></label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="cultural-input w-full"
                        placeholder="Enter a descriptive title for your content"
                        required
                      />
                    </div>
                    
                    {/* Description */}
                    <div className="mb-5">
                      <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description <span className="text-red-500">*</span></label>
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="cultural-input w-full"
                        placeholder="Provide detailed information about the cultural content"
                        required
                      />
                    </div>
                    
                    {/* Category and Era */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category <span className="text-red-500">*</span></label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="cultural-input w-full"
                          required
                        >
                          <option value="">Select a category</option>
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="era" className="block text-gray-700 font-medium mb-1">Era</label>
                        <select
                          id="era"
                          name="era"
                          value={formData.era}
                          onChange={handleInputChange}
                          className="cultural-input w-full"
                        >
                          <option value="">Select an era</option>
                          {eraOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Region and Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="region" className="block text-gray-700 font-medium mb-1">Region</label>
                        <select
                          id="region"
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          className="cultural-input w-full"
                        >
                          <option value="">Select a region</option>
                          {regionOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="style" className="block text-gray-700 font-medium mb-1">Style</label>
                        <select
                          id="style"
                          name="style"
                          value={formData.style}
                          onChange={handleInputChange}
                          className="cultural-input w-full"
                        >
                          <option value="">Select a style</option>
                          {styleOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Author */}
                    <div className="mb-5">
                      <label htmlFor="author" className="block text-gray-700 font-medium mb-1">Author/Creator</label>
                      <input
                        id="author"
                        name="author"
                        type="text"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="cultural-input w-full"
                        placeholder="Name of the creator or author (leave blank if unknown)"
                      />
                    </div>
                    
                    {/* Thumbnail */}
                    <div className="mb-5">
                      <label className="block text-gray-700 font-medium mb-1">Thumbnail Image</label>
                      {!thumbnailPreview ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                          <UploadIcon className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                          <p className="text-gray-500 mb-4">Click to upload or drag and drop</p>
                          <input
                            type="file"
                            id="thumbnail"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="thumbnail"
                            className="px-4 py-2 bg-cultural-saffron text-white rounded-lg cursor-pointer hover:bg-cultural-saffron/90 transition-colors inline-block"
                          >
                            Select Image
                          </label>
                        </div>
                      ) : (
                        <div className="relative">
                          <img 
                            src={thumbnailPreview} 
                            alt="Thumbnail preview" 
                            className="h-48 w-full object-cover rounded-xl" 
                          />
                          <button 
                            type="button" 
                            onClick={clearThumbnail} 
                            className="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Content Files */}
                    <div className="mb-5">
                      <label className="block text-gray-700 font-medium mb-1">Content Files</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <UploadIcon className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mb-4">Supported formats: Images, videos, PDF, and Word documents</p>
                        <input
                          type="file"
                          id="files"
                          multiple
                          onChange={handleFilesChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="files"
                          className="px-4 py-2 bg-cultural-saffron text-white rounded-lg cursor-pointer hover:bg-cultural-saffron/90 transition-colors inline-block"
                        >
                          Select Files
                        </label>
                        {files && files.length > 0 && (
                          <p className="mt-3 text-sm text-gray-600">{files.length} file(s) selected</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Notice */}
                    <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200 mb-5">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="text-sm text-amber-800">
                        <p className="font-medium">Note:</p>
                        <p>All content will undergo moderation to ensure it aligns with cultural themes and is appropriate for public viewing.</p>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full px-4 py-3 bg-cultural-saffron text-white rounded-xl text-lg font-medium hover:bg-cultural-saffron/90 transition-colors focus:ring-2 focus:ring-cultural-saffron/30 disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Content"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default Upload;
