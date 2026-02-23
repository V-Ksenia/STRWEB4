output "s3_bucket" {
  value = aws_s3_bucket.front_s3.id
}

output "distribution_id" {
  value = aws_cloudfront_distribution.clfr_distro.id
}