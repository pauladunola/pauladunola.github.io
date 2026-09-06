window.PAUL_SITE_DATA = window.PAUL_SITE_DATA || {};
window.PAUL_SITE_DATA.research = [
  {
    "slug": "robotic-yield-phenotyping",
    "title": "Field-wise robotic autonomous image collection",
    "kicker": "Robotics + Automation",
    "summary": "The integration of the Farm-NG robotic platform and RGB imaging systems automates field-scale data collection to transform manual crop evaluations into high-throughput digital pipelines.",
    "details": "Ground robots autonomously navigate blueberry rows to capture uniform, bush-level imagery at fixed distances. The setup ensures consistent data quality across variable field variable field conditions and diverse canopy structures.",
    "image": "assets/images/farmng-field.webp",
    "alt": "Field robotic platform operating between blueberry rows",
    "tags": ["Robotics", "Automation"],
    "featured": true,
    "icon": "robot"
  },
  {
    "slug": "blueberry-health-phenotyping",
    "title": "Computer vision for yield and plant health phenotyping",
    "kicker": "Detection + Segmentation + Phenotyping",
    "summary": "Advanced object detection and canopy segmentation models process field imagery to accurately estimate berry yield, track fruit maturity, and evaluate plant health.",
    "details": "Deep learning models locate and count individual berries to count berries, estimate berry yield and quantify fruit maturity. Instance segmentation isolate target plant, extract image-derived phenotypes and account for fruit occlusion. Automating symptom extraction complement subjective visual scoring, delivering rapid, repeatable health phenotyping across thousands of breeding lines simultaneously.",
    "image": "assets/images/canopy-computer-vision.webp",
    "alt": "Computer vision and canopy segmentation workflow on a blueberry plant",
    "tags": ["Yield", "Plant health", "Computer vision"],
    "featured": true,
    "icon": "vision"
  },
  {
    "slug": "robotic-harvest-cultivars",
    "title": "Development of blueberry cultivars for robotic harvesting",
    "kicker": "Breeding + Automation",
    "summary": "Define and phenotype plant and fruit traits that improve compatibility with robotic harvesting systems.",
    "details": "This breeding objective connects fruit exposure, cluster architecture, ripening concentration, fruit size, firmness, and postharvest quality with robotic harvest performance. The long-term goal is to develop cultivars that are productive, high quality, and physically compatible with automated harvesting systems.",
    "image": "assets/images/blueberry-cluster.webp",
    "alt": "Blueberry cluster showing multiple maturity stages",
    "tags": ["Robotic harvest", "Selection", "Cultivar development"],
    "featured": true,
    "icon": "harvest"
  },
  {
    "slug": "multi-domain-yield-prediction",
    "title": "Multi-domain prediction of blueberry yield",
    "kicker": "Genomics + Phenomics + Environmics",
    "summary": "Integrate robotic phenotyping, computer vision, genomic information, and environmental covariates to improve yield prediction and selection efficiency.",
    "details": "The broader goal is to combine complementary sources of information rather than rely on one data domain. Multi-domain prediction can improve selection, help prioritize genotypes, and make better use of expensive field-testing resources.",
    "image": "assets/images/conference-presentation.webp",
    "alt": "Paul Adunola presenting multi-domain blueberry yield prediction research",
    "tags": ["Genomics", "Phenomics", "Environmics", "Yield prediction"],
    "featured": true,
    "icon": "data"
  },
  {
    "slug": "target-environment-gxe",
    "title": "Target-environment prediction and GxE",
    "kicker": "Environmics + GxE",
    "summary": "Use long-term weather data and environmental covariates to characterize genotype-by-environment interaction, define production windows, and predict performance in new target environments.",
    "details": "This research combines historical weather, environmental covariates, multi-environment trial data, and predictive models to understand adaptation. It supports decisions about where to test, where to place cultivars, and how to define production systems for new environments.",
    "image": "assets/images/drone-field.webp",
    "alt": "Drone imaging over an agricultural field",
    "tags": ["GxE", "Environmics", "Target environments", "Yield prediction"],
    "featured": false,
    "icon": "globe"
  },
  {
    "slug": "global-genotype-recommendation",
    "title": "Global genotype recommendation and decision-support systems",
    "kicker": "Decision Support",
    "summary": "Develop breeder-facing frameworks that combine geolocation, climate, soil, management conditions, genotype performance, pedigree, and genomics to rank cultivars and advanced selections for target production systems.",
    "details": "The long-term objective is a practical recommendation platform that helps breeders evaluate genotype fit for a target location and management system while communicating expected performance, production windows, and major risks.",
    "image": "assets/images/data-analysis-office.webp",
    "alt": "Paul Adunola conducting statistical and predictive analysis at a workstation",
    "tags": ["Decision support", "Cultivar placement", "Risk factors"],
    "featured": false,
    "icon": "decision"
  },
  {
    "slug": "phenomic-prediction-nirs",
    "title": "Phenomic Prediction using NIRS",
    "kicker": "Phenomic-Assisted Selection",
    "summary": "Evaluate near-infrared spectroscopy (NIRS) as a rapid and cost-effective source of phenomic information for predicting complex breeding traits and supporting selection decisions.",
    "details": "This research evaluates NIRS-based phenomic prediction across perennial crop breeding systems. In Coffea canephora, NIR reflectance was used to predict yield within and across environments and was compared with genomic prediction. In blueberry, NIRS from different biological tissues was evaluated for predicting fruit-quality traits and for phenomic-assisted selection. The broader objective is to integrate inexpensive, high-throughput spectral information with conventional phenotypes and genomic information to increase selection efficiency in breeding programs.",
    "image": "assets/images/nir-phenotyping.jpg",
    "alt": "Paul Adunola collecting near-infrared spectra from blueberry fruit for phenomic prediction",
    "tags": [
      "NIRS",
      "Phenomic prediction",
      "Phenomic-assisted selection",
      "Genomic prediction",
      "Predictive breeding"
    ],
    "links": [
      {
        "label": "Phenomic prediction for coffee yield",
        "url": "https://acsess.onlinelibrary.wiley.com/doi/full/10.1002/ppj2.20109"
      },
      {
        "label": "Phenomic-assisted selection in blueberry",
        "url": "https://acsess.onlinelibrary.wiley.com/doi/full/10.1002/ppj2.70010"
      }
    ],
    "featured": false,
    "icon": "data"
  },
  {
    "slug": "high-throughput-phenotyping-tools",
    "title": "Developing High-throughput Phenotyping Tools",
    "kicker": "Digital Phenotyping",
    "summary": "Develop computer-vision and automated imaging tools to rapidly quantify blueberry fruit-quality traits that are difficult, subjective, or time-consuming to measure manually.",
    "details": "This research develops image-based phenotyping systems for blueberry breeding, including the berryCV workflow for automated measurement of wax bloom, fruit size, shape, color, and picking-scar traits. The broader platform is being expanded toward additional breeding traits such as seed number, internal fruit damage, post-harvest quality, and other external and internal fruit characteristics. Standardized imaging, computer vision, machine learning, barcode-based sample tracking, and automated data extraction are combined to increase phenotyping throughput and provide objective measurements for breeding and genetic analyses.",
    "image": "assets/images/conveyor-system.webp",
    "alt": "Automated blueberry imaging and conveyor system developed for high-throughput fruit phenotyping",
    "tags": [
      "Computer vision",
      "High-throughput phenotyping",
      "Fruit quality",
      "Post-harvest",
      "Cellular imaging",
      "Automation"
    ],
    "links": [
      {
        "label": "berryCV workflow",
        "url": "https://github.com/SFP-team/berrycv-workflow"
      }
    ],
    "featured": false,
    "icon": "vision"
  }
]
  ;
